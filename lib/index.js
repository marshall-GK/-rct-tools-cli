const readline = require("readline");
const { processCommand } = require("../src/command");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

const args = process.argv;

processCommand(args);
