const createComponent = require('./create-component');
const createHookFile = require('./create-hook');
const createFunctionFile = require('./create-function');
const getFilePath = require('./find');
const { validateFileCommands, validateSingleCommands } = require('./Validators/validator');
const { renderHelp } = require('./help');
const { funcCompRule } = require('./Validators/rules');
const { boldRedChalk } = require('./utils');
const { verifyConfigFileData, getConfigFileData } = require('./find');
const { createConfigFile } = require('./create-config');
const npmPackage = require('../package.json');

const processCommand = async (args) => {
  try {
    const firstCommand = (args[2] || '').toLowerCase();
    const secondCommand = args[3] || '';
    const thirdCommand = (args[4] || '').toLowerCase();
    if (validateSingleCommands(firstCommand)) {
      switch (firstCommand) {
        case 'help':
          renderHelp();
          break;
        // case "-h":
        //   {
        //     renderHelp();
        //   }
        //   break;
        case '--find':
          getFilePath();
          break;
        case 'v':
          boldRedChalk(`v${npmPackage.version}`);
          break;
        default: {
          throw new Error('No matching Command');
        }
      }
    } else if (validateFileCommands(firstCommand)) {
      const isConfigValid = await verifyConfigFileData();
      // console.log({isConfigValid})
      if (!isConfigValid) {
        boldRedChalk('Corrupted react-construct.json file, re-initiating.');
        await createConfigFile();
      }
      const configFile = getConfigFileData();
      switch (firstCommand) {
        case 'fc':
          if (funcCompRule()) createComponent(secondCommand, thirdCommand, configFile);
          break;
        case 'h':
          createHookFile(secondCommand, thirdCommand, configFile);
          break;
        case 'f':
          createFunctionFile(secondCommand, thirdCommand, configFile);
          break;
        default: {
          throw new Error('Invalid file command');
        }
      }
    } else {
      throw new Error('Use following commands');
    }
    process.exit(0);
  } catch (err) {
    boldRedChalk(err);
    renderHelp();
    process.exit(1);
  }
};

module.exports = {
  processCommand,
};
