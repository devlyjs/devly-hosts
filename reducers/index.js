const winston = require('winston');
const { ADD_HOSTS_CONFIG, ADD_HOSTS_COMMANDS } = require('../actions');
const yargs = require('@devly/devly-cli');
const Hosts = require('../scripts/hosts');
const hosts = new Hosts();
const initialState = {};
winston.cli();

function addHostsConfig(state, config){
  return {...state, ...config};
}

function addHostsCommands(state){
  yargs.command('hosts init','Add or update new hostnames',
    {
      force: {
        alias: 'f',
        default: false,
      },
    },
    function handler(argv) {
      winston.log('info','Initializing hosts!');
      hosts.init(argv.force);
    }
  );
  return state;
}

module.exports = function hostsReducer(state = initialState, action){
  switch (action.type) {
    case ADD_HOSTS_CONFIG:
      return addHostsConfig(state, action.config);
    case ADD_HOSTS_COMMANDS:
      return addHostsCommands(state);
    default:
      return state;
  }
}
