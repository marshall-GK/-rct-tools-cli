const { argv } = process;
const chalk = require("chalk");
const { boldRedChalk, boldGreenChalk } = require("../utils");
const {
  validateName,
  validatePath,
} = require("./validator");


// boldGreenChalk("==============Rule check started===========");

const funcCompRule = () => {
  const totalArgsLenghtRequired = 5;
  const args = argv;
  try {
    if (args && args.length === totalArgsLenghtRequired) {
      const command = args[2];
      const componentName = args[3];
      const dirPath = args[4] || "./";
      if (
        validateName(componentName) &&
        validatePath(dirPath)
      ) {
        return true;
      } else {
        throw new Error("Invalid component name or component path.");
      }
    } else {
      throw new Error("Check your command.");
    }
  } catch (err) {
    boldRedChalk(err)
    return false;
  }
};

const funcRule = () => {
  return "";
};

const hookRule = () => {
  return "";
};

module.exports = {
  funcCompRule,
  funcRule,
  hookRule,
};
