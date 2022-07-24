const fs = require('fs');
const chalk = require('chalk');
const shell = require('child_process');

const allCommands = require('./allcomands.json');

const { platform } = process;

const boldRedChalk = (data) => {
  // eslint-disable-next-line no-console
  console.log(chalk.red.bold(data));
};

const yellowChalk = (data) => {
  // eslint-disable-next-line no-console
  console.log(chalk.yellow(data));
};

const boldYellowChalk = (data) => {
  // eslint-disable-next-line no-console
  console.log(chalk.yellow.bold(data));
};

const boldGreenChalk = (data) => {
  // eslint-disable-next-line no-console
  console.log(chalk.green.bold(data));
};

const boldBlueChalk = (data) => {
  // eslint-disable-next-line no-console
  console.log(chalk.blue.bold(data));
};

const boldCyanChalk = (data) => {
  // eslint-disable-next-line no-console
  console.log(chalk.cyan.bold(data));
};

const whiteChalk = (data) => {
  // eslint-disable-next-line no-console
  console.log(chalk.white(data));
};

const emptyLog = () => {
  // eslint-disable-next-line no-console
  console.log('');
};

const displayError = (err) => {
  switch (err.code || err) {
    case 'EEXIST':
      boldRedChalk('[ERROR]: Aborting, directory already present.');
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case 'ENOENT':
      boldRedChalk('[ERROR]: Aborting, invalid path, please check.');
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    default:
      boldRedChalk(err);
      process.exit(1);
  }
};

const getCamleCase = (data) => {
  return data.charAt(0).toUpperCase() + data.slice(1);
};

const getComponentName = (componentName, isCamelCase = true) => {
  return isCamelCase ? getCamleCase(componentName) : componentName;
};

const createDirectory = (dirPath) => {
  try {
    fs.mkdirSync(dirPath);
  } catch (err) {
    displayError(err);
  }
};

const modifyPathUrl = (path) => {
  if (path) {
    switch (platform) {
      case 'win32': {
        return path.replaceAll('/', '\\');
      }
      default: {
        return path;
      }
    }
  }
  return '';
};

const deleteAsset = (path) => {
  try {
    const newPath = modifyPathUrl(path);
    switch (process.platform) {
      case 'win32':
        shell.execSync(`rd /s /q "${newPath}"`);
        break;
      default: {
        shell.execSync(`rm -rf "${newPath}"`);
      }
    }
  } catch (err) {
    displayError(err);
  }
};

const copyDirAndFiles = (source, destination, isRecursive = true) => {
  try {
    const newSrc = modifyPathUrl(source);
    const newDest = modifyPathUrl(destination);
    switch (platform) {
      case 'win32':
        shell.execSync(`copy "${newSrc}" "${newDest}"`);
        break;
      default: {
        shell.execSync(`cp${isRecursive ? ' -r' : ''} "${newSrc}" "${newDest}"`);
      }
    }
  } catch (err) {
    deleteAsset(destination);
    displayError(err);
  }
};

const moveDirAndFiles = (source, destination) => {
  try {
    const newSrc = modifyPathUrl(source);
    const newDest = modifyPathUrl(destination);
    switch (process.platform) {
      case 'win32':
        shell.execSync(`move "${newSrc}" "${newDest}"`);
        break;
      default: {
        shell.execSync(`mv "${newSrc}" "${newDest}"`);
      }
    }
  } catch (err) {
    displayError(err);
  }
};

const getAllCommands = () => {
  return { ...allCommands };
  // console.log(allCommandsObj);
};

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
  getAllCommands,
};
