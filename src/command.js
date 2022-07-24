const createComponent = require("../src/create-component");
const createHookFile = require("../src/create-hook");
const createFunctionFile = require("../src/create-function");
const getFilePath = require("../src/find");
const {
  validateName,
  validateFileCommands,
  validatePath,
  validateSingleCommands,
  validateFileTypeInput,
} = require("../src/Validators/validator");
const { renderHelp } = require("../src/help");
const { funcCompRule, funcRule, hookRule } = require("../src/Validators/rules");
const { boldRedChalk, boldGreenChalk, boldBlueChalk } = require("../src/utils");
const { verifyConfigFileLocation, verifyConfigFileData, getConfigFileData } = require("./find");
const { createConfigFile } = require("./create-config");
const package = require('../package.json');

const processCommand = async (args) => {
  try {
    const isConfigValid = await verifyConfigFileData();
    // console.log({isConfigValid})
    if (!isConfigValid) {
      boldRedChalk("Corrupted react-construct.json file, re-initiating.");
      await createConfigFile();
    }
    const configFile = getConfigFileData();
    const firstCommand = (args[2] || "").toLowerCase();
    const secondCommand = args[3] || "";
    const thirdCommand = (args[4] || "").toLowerCase();
    if (validateSingleCommands(firstCommand)) {
      switch (firstCommand) {
        case "help":
          {
            renderHelp();
          }
          break;
        // case "-h":
        //   {
        //     renderHelp();
        //   }
        //   break;
        case "--find":
          {
            getFilePath();
          }
          break;
        case 'v': {
          boldRedChalk(`v${package.version}`);
        }
          break;
        default: {
          throw new Error("No matching Command");
        }
      }
    } else if (validateFileCommands(firstCommand)) {
      switch (firstCommand) {
        case "fc":
          {
            funcCompRule()
              ? createComponent(secondCommand, thirdCommand, configFile)
              : null;
          }
          break;
        case "h":
          {
            createHookFile(secondCommand, thirdCommand, configFile);
          }
          break;
        case "f":
          {
            createFunctionFile(secondCommand, thirdCommand, configFile);
          }
          break;
        default: {
          throw new Error("Invalid file command");
        }
      }
    } else {
      throw new Error("Use following commands");
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
