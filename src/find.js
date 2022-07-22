const {
  accessSync,
  constants,
  outputFileSync,
  readFileSync,
} = require("fs-extra");
const chalk = require("chalk");
const lodash = require("lodash");

const {
  checkConfigFileData,
  createConfigFile,
  getQuestions,
} = require("./create-config");
const { boldRedChalk, boldCyanChalk, emptyLog } = require("./utils");

const verifyConfigFileLocation = () => {
  const filePath = process.cwd();
  try {
    accessSync("./package.json", constants.R_OK);
    try {
      accessSync("./rcli.json", constants.R_OK);
      return {
        isSuccess: true,
      };
    } catch (err) {
      boldRedChalk(err);
      boldCyanChalk(
        "It looks like this is the first time that you're running rcli within this project."
      );
      return {
        fileMissing: true,
      };
    }
  } catch (err) {
    boldRedChalk(err);
    boldRedChalk(
      "[ERROR]: Please make sure that you're running the rcli commands from the root level of your React project"
    );
    return {
      invalidPath: true,
    };
  }
};

const verifyConfigFileData = async () => {
  try {
    const fileStatus = verifyConfigFileLocation();
    if (fileStatus.isSuccess) {
      const fileData = readFileSync("./rcli.json");
      const isDataPresent = fileData.toJSON();
      if(isDataPresent.data.length) {
        const data = JSON.parse(fileData);
        const objData = Object.keys(data || {});
        if(objData.length) {
          const questions = getQuestions();
          const isValid = questions.every((ques) => data.hasOwnProperty(ques.name));
          return isValid;
        }
      }
      return false;
    } else if (fileStatus.fileMissing) {
      return await createConfigFile();
    } else {
      throw new Error("");
    }
  } catch (err) {
    process.exit(1);
  }
};

const getConfigFilePath = async () => {
  const filePath = process.cwd();
  try {
    accessSync("./package.json", constants.R_OK);
    try {
      accessSync("./rcli.json", constants.R_OK);
      try {
        const fileData = readFileSync("./rcli.json");
        const currentConfigFile = JSON.parse(fileData);
        checkConfigFileData(currentConfigFile);
      } catch (err) {
        boldRedChalk("It looks like rcli.json file data is corrupted");
        return process.exit(1);
      }
    } catch (err) {
      boldCyanChalk(
        "It looks like this is the first time that you're running rcli within this project."
      );
      await createConfigFile();
    }
  } catch (err) {
    boldRedChalk(
      "ERROR: Please make sure that you're running the rcli commands from the root level of your React project"
    );
    return process.exit(1);
  }
};

const getConfigFileData = () => {
  try {
    const fileData = readFileSync("./rcli.json");
    return JSON.parse(fileData);
  } catch (err) {
    boldRedChalk("Failed to fetch config file data, try again");
    emptyLog();
    getConfigFilePath()
    // process.exit(1);
  }
};

module.exports = {
  getConfigFilePath,
  verifyConfigFileLocation,
  verifyConfigFileData,
  getConfigFileData,
};
