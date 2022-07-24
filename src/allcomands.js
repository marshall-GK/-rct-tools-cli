const createComponent = require('./create-component');
const createHookFile = require('./create-hook');
const createFunctionFile = require('./create-function');
const renderHelp = require('./help');
const { boldRedChalk } = require('./utils');

const npmPackage = require('../package.json');

const getAllCommands = () => ({
  fc: {
    description: 'For stateful functional component',
    usage: 'react-construct fc <component_name> <relative_path>',
  },
  h: {
    description: 'For hook file',
    usage: 'react-construct h <component_name> <relative_path>',
  },
  f: {
    description: 'For stateless function file',
    usage: 'react-construct f <file_name> <relative_path>',
  },
  help: {
    description: 'For help',
    usage: 'react-construct help',
  },
  v: {
    description: 'Know your react-construct version',
    usage: 'react-construct v',
  },
});

const getAllCommandsMappedRun = () => ({
  fc: {
    get run() {
      return createComponent;
    },
  },
  h: {
    get run() {
      return createHookFile;
    },
  },
  f: {
    get run() {
      return createFunctionFile;
    },
  },
  help: {
    get run() {
      return renderHelp;
    },
  },
  v: {
    get run() {
      return boldRedChalk(`v${npmPackage.version}`);
    },
  },
});

module.exports = {
  getAllCommands,
  getAllCommandsMappedRun,
};
