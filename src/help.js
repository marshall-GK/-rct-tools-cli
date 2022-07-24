const chalk = require("chalk");
const package = require("../package.json");
const { whiteChalk, emptyLog, getAllCommands } = require("./utils");
const Table = require("easy-table");

const renderHelp = () => {
  const table = new Table;
  const allCommandsObj = getAllCommands();
  Object.keys(allCommandsObj).forEach(key => {
    const commandObj = allCommandsObj[key];
    table.cell('Command', key);
    table.cell('Description', commandObj.description);
    table.cell('Usage', commandObj.usage);
    table.newRow();
  });
  emptyLog();
  console.log(table.toString());
  emptyLog();
};

module.exports = {
  renderHelp,
};
