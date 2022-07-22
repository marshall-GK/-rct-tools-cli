const fs = require("fs");
const { displayError } = require("../utils");

const validateName = (name) => {
  const nameRegx = /^[aA-zZ0-9]+$/gim;
  return name ? nameRegx.test(name) : false;
};

const validatePath = (path) => {
  const pathRegx = /^([.]{0,2}[\/]{0,1}(?:[\w])*)([/\w]*)$/gim;
  return path ? pathRegx.test(path) : false;
};

const validateFileTypeInput = (fileType = "") => {
  const fileTypeRegx = /^(ts|js|tsx|jsx)$/gm;
  return fileType ? fileTypeRegx.test(fileType) : false;
};

const validateFileCommands = (flag) => {
  const flagRegx = /^(fc|h|f|)$/gm;
  return flag ? flagRegx.test(flag) : false;
};

const isFileAlreadyPresent = (path) => {
  try {
    return fs.existsSync(path);
  } catch (err) {
    console.error(err);
    displayError(err);
  }
};

const validateSingleCommands = (flag) => {
  const flagRegx = /^--(help|find|)$/gm;
  const tinyFlagRegx = /^-(h|v)$/gm;
  return flag ? flagRegx.test(flag) || tinyFlagRegx.test(flag) : false;
};

// exports.validateComponentNamePath = validateComponentNamePath;
// exports.validateCommands = validateCommands;
// exports.validateComponentName = validateComponentName;
// exports.validateFileTypeInput = validateFileTypeInput;
// exports.isFileAlreadyPresent = isFileAlreadyPresent;
module.exports = {
  validateSingleCommands,
  validatePath,
  validateFileCommands,
  validateName,
  validateFileTypeInput,
  isFileAlreadyPresent,
};
