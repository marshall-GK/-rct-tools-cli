const fs = require("fs");
const chalk = require("chalk");
const shell = require("child_process");
const {
  accessSync,
  constants,
  outputFileSync,
  copySync,
  moveSync,
  removeSync,
  remove,
} = require("fs-extra");
const replace = require("replace");

const allCommands = require('./allcomands');

const { platform } = process;

const displayError = (err) => {
  switch (err.code || err) {
    case "EEXIST": {
      boldRedChalk("[ERROR]: Aborting, directory already present.");
      process.exit(1);
    }
    case "ENOENT": {
      boldRedChalk("[ERROR]: Aborting, invalid path, please check.");
      process.exit(1);
    }
    default:
      boldRedChalk(err);
      process.exit(1);
  }
};

const boldRedChalk = (data) => {
  console.log(chalk.red.bold(data));
};

const yellowChalk = (data) => {
  console.log(chalk.yellow(data));
};

const boldYellowChalk = (data) => {
  console.log(chalk.yellow.bold(data));
};

const boldGreenChalk = (data) => {
  console.log(chalk.green.bold(data));
};

const boldBlueChalk = (data) => {
  console.log(chalk.blue.bold(data));
};

const boldCyanChalk = (data) => {
  console.log(chalk.cyan.bold(data));
};

const whiteChalk = (data) => {
  console.log(chalk.white(data));
};

const emptyLog = () => {
  console.log("");
};

const getConfigFileData = () => {};

const getComponentName = (componentName, isCamelCase = true) => {
  return isCamelCase ? getCamleCase(componentName) : componentName;
};

const getCamleCase = (data) => {
  return data.charAt(0).toUpperCase() + data.slice(1);
};

const createDirectory = (dirPath) => {
  try {
    fs.mkdirSync(dirPath);
  } catch (err) {
    displayError(err);
  }
};

const copyDirAndFiles = (source, destination, isRecursive = true) => {
  try {
    const newSrc = modifyPathUrl(source);
    const newDest = modifyPathUrl(destination);
    switch (platform) {
      case "win32":
        {
          shell.execSync(`copy ${newSrc} ${newDest}`);
        }
        break;
      default: {
        shell.execSync(`cp${isRecursive ? " -r" : ""} ${newSrc} ${newDest}`);
      }
    }
  } catch (err) {
    displayError(err);
  }
};

const moveDirAndFiles = (source, destination) => {
  try {
    const newSrc = modifyPathUrl(source);
    const newDest = modifyPathUrl(destination);
    switch (process.platform) {
      case "win32":
        {
          shell.execSync(`move ${newSrc} ${newDest}`);
        }
        break;
      default: {
        shell.execSync(`mv ${newSrc} ${newDest}`);
      }
    }
  } catch (err) {
    displayError(err);
  }
};

const deleteAsset = (path) => {
  try {
    const newPath = modifyPathUrl(path);
    switch (process.platform) {
      case "win32":
        {
          shell.execSync(`rd /s /q ${newPath}`);
        }
        break;
      default: {
        shell.execSync(`rm -rf ${newPath}`);
      }
    }
  } catch (err) {
    displayError(err);
  }
};

const replaceFileName = (config) => {
  replace(config);
};

const modifyPathUrl = (path) => {
  if (path) {
    switch (platform) {
      case "win32": {
        return path.replaceAll("/", "\\");
      }
      default: {
        return path;
      }
    }
  }
};

const getAllCommands = () => {
  const allCommandsObj = Object.create(allCommands);
  console.log(allCommandsObj);
}

module.exports = {
  getComponentName,
  createDirectory,
  copyDirAndFiles,
  moveDirAndFiles,
  deleteAsset,
  displayError,
  modifyPathUrl,
  boldRedChalk,
  yellowChalk,
  boldYellowChalk,
  emptyLog,
  boldGreenChalk,
  boldBlueChalk,
  boldCyanChalk,
  whiteChalk,
  getCamleCase,
  getAllCommands
};
