const chalk = require("chalk");
const package = require("../package.json");
const { whiteChalk, emptyLog, getAllCommands } = require("./utils");

const commands = [
  { command: 'fc', description: 'For Functional Component' },
  { command: 'f', description: 'For simple function file' },
  { command: 'h', description: 'For hook file' },
  { command: '--help or -h', description: 'For Help' },
  { command: '-v', description: 'For version' },
];

const usage = [
  { command: 'fc', Usage: 'react-construct fc <component_name> <relative_path>' },
  { command: 'f', Usage: 'react-construct f <file_name> <relative_path>' },
  { command: 'h', Usage: 'react-construct h <component_name> <relative_path>' },
]

const renderHelp = () => {
  getAllCommands();
  console.table(commands);
  emptyLog();
  console.table(usage);
  emptyLog();
};

module.exports = {
  renderHelp,
};
