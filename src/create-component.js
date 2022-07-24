const fs = require('fs');
const replace = require('replace');

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
} = require('./utils');

const fileContentDir = {
  jsx: 'JsxTemplate',
  tsx: 'TsxTemplate',
};

const createComponentFiles = (dirPath, component, souceDir) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const allDirent = fs.readdirSync(`${dirPath}`, { withFileTypes: true });
    const allDirNames = allDirent.filter((dirent) => dirent.isFile()).map((dir) => dir.name);
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
        moveDirAndFiles(modifyPathUrl(`${dirPath}/${file}`), modifyPathUrl(`${dirPath}/${newFileName}`));
        yellowChalk(`${newFileName}`);
      } catch (err) {
        boldRedChalk(`ERROR: Failed to create file: ${err}`);
        throw err;
      }
    });
    emptyLog();
    boldGreenChalk('Functional Component created');
    emptyLog();
  } catch (err) {
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

const createDir = (component, path, souceDir, configFile) => {
  const { useCamelCaseName } = configFile;
  const name = getComponentName(component, useCamelCaseName);
  const currentDirPath = process.cwd();
  const dirPath = modifyPathUrl(`${currentDirPath}/${path && path !== './' ? path : ''}${name}`);
  // eslint-disable-next-line no-useless-catch
  try {
    createDirectory(dirPath);
    copyDirAndFiles(modifyPathUrl(`${__dirname}/Templates/${souceDir}/.`), dirPath);
    createFile(dirPath, name, souceDir, configFile);
  } catch (err) {
    // deleteAsset(dirPath);
    throw err;
  }
};

const createComponent = (component, path, configFile) => {
  const { isTypescript } = configFile;
  const souceDir = isTypescript ? fileContentDir.tsx : fileContentDir.jsx;
  createDir(component, path, souceDir, configFile);
};

module.exports = createComponent;
