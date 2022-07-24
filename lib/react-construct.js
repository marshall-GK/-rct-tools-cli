const { processCommand } = require('../src/command');

const args = process.argv;

process.on('warning', (e) => console.warn(e.stack));
processCommand(args);
