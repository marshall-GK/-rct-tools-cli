const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { accessSync, constants, outputFileSync, copySync } = require("fs-extra");
const shell = require("child_process");
const replace = require("replace");
const lodash = require("lodash");
const { validateName, validatePath } = require("./Validators/validator");

const {
  getComponentName,
  createDirectory,
  copyDirAndFiles,
  deleteAsset,
  moveDirAndFiles,
  modifyPathUrl,
  boldRedChalk,
  emptyLog,
  boldGreenChalk,
  yellowChalk,
} = require("./utils");

const { getConfigFileData } = require("./find");

const fileContentDir = {
  jsx: "JsxTemplate",
  tsx: "TsxTemplate",
};

const createComponent = (component, path, configFile) => {
  const { isTypescript } = configFile;
  const souceDir = isTypescript
    ? fileContentDir.tsx
    : fileContentDir.jsx;
  createDir(component, path, souceDir, configFile);
};

const createDir = (component, path, souceDir, configFile) => {
  const { useCamelCaseName } = configFile;
  const name = getComponentName(component, useCamelCaseName);
  const currentDirPath = process.cwd();
  const dirPath = modifyPathUrl(`${currentDirPath}/${path}/${name}`);
  try {
    createDirectory(dirPath);
    copyDirAndFiles(
      modifyPathUrl(`${__dirname}/Templates/${souceDir}/*`),
      dirPath
    );
    createFile(dirPath, name, souceDir, configFile);
  } catch (err) {
    // deleteAsset(dirPath);
    throw err;
  }
};

const createFile = (dirPath, component, souceDir, configFile) => {
  try {
    createComponentFiles(dirPath, component, souceDir, configFile);
  } catch (err) {
    boldRedChalk(`[ERROR]: Failed to create file`);
    deleteAsset(dirPath);
    throw err;
  }
};

const createComponentFiles = (dirPath, component, souceDir) => {
  try {
    const allDirent = fs.readdirSync(`${dirPath}`, { withFileTypes: true });
    const allDirNames = allDirent
      .filter((dirent) => dirent.isFile())
      .map((dir) => dir.name);
    emptyLog();


    (allDirNames || []).forEach((file) => {
      try {
        replace({
          regex: souceDir,
          replacement: component,
          paths: [modifyPathUrl(`${dirPath}/${file}`)],
          recursive: true,
          silent: true,
        });
        const newFileName = file.replace(`${souceDir}`, component);
        moveDirAndFiles(
          modifyPathUrl(`${dirPath}/${file}`),
          modifyPathUrl(`${dirPath}/${newFileName}`)
        );
        yellowChalk(`${newFileName}`);
      } catch (err) {
        boldRedChalk(`ERROR: Failed to create file: ${err}`);
        throw err;
      }
    });
    emptyLog();
    boldGreenChalk("Functional Component created");
    emptyLog();
  } catch (err) {
    throw err;
  }
};

module.exports = createComponent;
