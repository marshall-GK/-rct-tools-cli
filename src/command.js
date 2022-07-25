const { validateFileCommands, validateSingleCommands } = require('./Validators/validator');
// const getFilePath = require('./find');
// const renderHelp = require('./help');
const { funcCompRule } = require('./Validators/rules');
const { boldRedChalk } = require('./utils');
const { createConfigFile } = require('./create-config');
const { verifyConfigFileData, getConfigFileData } = require('./find');
const getAllCommandsMappedRun = require('./allCommandsMappedRun');

const processCommand = async (args) => {
  const allCommandsObj = getAllCommandsMappedRun();
  try {
    const firstCommand = (args[2] || '').toLowerCase();
    const secondCommand = args[3] || '';
    const thirdCommand = (args[4] || '').toLowerCase();
    // eslint-disable-next-line no-console
    // console.log({ args });
    if (validateSingleCommands(firstCommand)) {
      if (allCommandsObj[firstCommand]) {
        allCommandsObj[firstCommand].run();
      } else {
        throw new Error('No matching Command');
      }
    } else if (validateFileCommands(firstCommand)) {
      const isConfigValid = await verifyConfigFileData();
      // console.log({isConfigValid})
      if (!isConfigValid) {
        boldRedChalk('Corrupted react-construct.json file, re-initiating.');
        await createConfigFile();
      }
      const configFile = getConfigFileData();
      if (allCommandsObj[firstCommand]) {
        if (firstCommand === 'fc' && funcCompRule()) {
          allCommandsObj[firstCommand].run(secondCommand, thirdCommand, configFile);
        } else {
          allCommandsObj[firstCommand].run(secondCommand, thirdCommand, configFile);
        }
      } else {
        throw new Error('Invalid file command');
      }
    } else {
      throw new Error('Use following commands');
    }
    // process.exit(0);
  } catch (err) {
    boldRedChalk(err);
    allCommandsObj.help.run();
    process.exit(1);
  }
};

module.exports = {
  processCommand,
};
