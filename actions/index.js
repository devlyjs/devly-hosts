// Use higher order reducers here

const ADD_HOSTS_CONFIG = 'ADD_HOSTS_CONFIG';
const ADD_HOSTS_COMMANDS = 'ADD_HOSTS_COMMANDS';

function addApacheConfig (config) {
  //console.log('config action fired: ', config);
  return {
    type: ADD_HOSTS_CONFIG,
    config
  }
}

function addApacheCommands (yargs) {
  console.log('action fired: ');
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
