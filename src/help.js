const Table = require('easy-table');
const { emptyLog } = require('./utils');
const { getAllCommands } = require('./allcomands');

const renderHelp = () => {
  const table = new Table();
  const allCommandsObj = getAllCommands();
  console.log('help called');
  Object.keys(allCommandsObj).forEach((key) => {
    const commandObj = allCommandsObj[key];
    table.cell('Command', key);
    table.cell('Description', commandObj.description);
    table.cell('Usage', commandObj.usage);
    table.newRow();
  });
  emptyLog();
  // eslint-disable-next-line no-console
  console.log(table.toString());
  emptyLog();
};

module.exports = renderHelp;
