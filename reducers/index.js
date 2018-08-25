const winston = require('winston');
const { ADD_HOSTS_CONFIG, ADD_HOSTS_COMMANDS, UPDATE_HTTPD_VHOSTS } = require('../actions');
const yargs = require('@devly/devly-cli');
const Hosts = require('../scripts/hosts');
const hosts = new Hosts();
const initialState = {};
winston.cli();

function addHostsConfig(state, config){
  return {...state, ...config};
}

function addHostsCommands(state){
  yargs.command('hosts init','Init file, app, or machine',
    {
      force: {
        alias: 'f',
        default: false,
      },
    },
    function handler(argv) {
      winston.log('info','Initializing Proxy Server!');
      hosts.init(argv.force);
    }
  );
  return state;
}

module.exports = function hostsReducer(state = initialState, action){
  console.log('hostsReducer outside of switch statement : ', action.type);
  switch (action.type) {
    case ADD_HOSTS_CONFIG:
      return addHostsConfig(state, action.config);
    case ADD_HOSTS_COMMANDS:
      console.log('add command reducer: ');
      return addHostsCommands(state);
    default:
      return state;
  }
}
