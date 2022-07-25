const createComponent = require('./create-component');
const createHookFile = require('./create-hook');
const createFunctionFile = require('./create-function');
const renderHelp = require('./help');
const { boldRedChalk } = require('./utils');

const npmPackage = require('../package.json');

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

module.exports = getAllCommandsMappedRun;
