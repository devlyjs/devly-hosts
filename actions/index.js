// Use higher order reducers here

const ADD_HOSTS_CONFIG = 'ADD_HOSTS_CONFIG';
const ADD_HOSTS_COMMANDS = 'ADD_HOSTS_COMMANDS';

function addHostsConfig (config) {
  return {
    type: ADD_HOSTS_CONFIG,
    config
  }
}

function addHostsCommands (yargs) {
  return {
    type: ADD_HOSTS_COMMANDS,
    yargs
  }
}


module.exports = {
  addHostsConfig,
  addHostsCommands,
  ADD_HOSTS_CONFIG,
  ADD_HOSTS_COMMANDS
}
