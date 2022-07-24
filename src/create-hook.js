const replace = require('replace');
const { getComponentName, copyDirAndFiles, boldRedChalk, emptyLog, boldBlueChalk, boldGreenChalk } = require('./utils');
const { isFileAlreadyPresent } = require('./Validators/validator');

const createHookFile = (hookName, path, configFile) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { useCamelCaseName, isTypescript } = configFile;
    const name = getComponentName(hookName, useCamelCaseName);
    const extension = isTypescript ? 'tsx' : 'js';

    const hookDestinationPath = `${path}/${name}.${extension}`;
    if (isFileAlreadyPresent(hookDestinationPath)) {
      boldRedChalk(`[Error]: Aborting, ${name}.${extension} already exists.`);
      process.exit(1);
    }
    copyDirAndFiles(`${__dirname}/Templates/HookTemplate.js`, hookDestinationPath);
    replace({
      regex: 'useHook',
      replacement: `use${name}`,
      paths: [hookDestinationPath],
      recursive: true,
      silent: true,
    });

    emptyLog();
    boldBlueChalk(`[Path]: ${hookDestinationPath}`);
    boldGreenChalk(`Hook ${name}.${extension} created.`);
  } catch (err) {
    throw err;
  }
};

module.exports = createHookFile;
