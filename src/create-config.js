const { outputFileSync } = require('fs-extra');
const { prompt } = require('inquirer');
const { boldRedChalk } = require('./utils');

const getQuestions = () => [
  {
    type: 'confirm',
    name: 'isTypescript',
    message: 'Does this project use TypeScript?',
  },
  // {
  //   type: "confirm",
  //   name: "isJssModule",
  //   message: "Does this project use React-JSS?",
  // },
  // {
  //   type: 'list',
  //   name: 'cssPreprocessor',
  //   message: 'Does this project use a CSS Preprocessor?',
  //   choices: ['css', 'scss', 'less', 'styl'],
  //   when: (answers) => !answers.isJssModule
  // },
  // {
  //   type: "confirm",
  //   name: "useCamelCaseName",
  //   message: "Do you want to use camelCase naming convention?",
  // },
];

// eslint-disable-next-line consistent-return
const checkConfigFileData = (fileData) => {
  if (fileData) {
    try {
      if (Array.isArray(fileData)) {
        throw new Error('react-construct.json file should have json data');
      }
      return fileData;
    } catch (err) {
      boldRedChalk(err);
      return process.exit(1);
    }
  } else {
    boldRedChalk('No data found');
    process.exit(1);
  }
};

const createConfigFile = async () => {
  try {
    const obj = await prompt(getQuestions());
    outputFileSync('react-construct.json', JSON.stringify(obj, null, 2));
    return true;
  } catch (err) {
    boldRedChalk(err);
    return false;
  }
};

module.exports = {
  checkConfigFileData,
  createConfigFile,
  getQuestions,
};
