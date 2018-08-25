const {
  spawnSync,
} = require('child_process');
const {
  store
} = require('@devly/devly-store');
const fs = require('fs');
const winston = require('winston');

winston.cli();


function updateHostsFile(hosts, filePath) {
  let newEntries = '';
  const data = fs.readFileSync(filePath, 'utf8');

  let result;

  hosts.forEach(item => {
    if (data.indexOf(`${item.ip}          ${item.dns}`) === -1) {
      newEntries += `${item.ip}          ${item.dns}\n`;
    }
    if (data.indexOf(`${item.ip}          www.${item.dns}`) === -1) {
      newEntries += `${item.ip}          www.${item.dns}\n`;
    }
  })


  if (newEntries) {
    result = data.replace(/(^::1.+)/gm, `$1\n${newEntries}`);
  } else {
    result = data;
  }

  fs.writeFileSync('./hosts', result, 'utf8');
  spawnSync('sudo mv ./hosts /etc', [], {
    shell: true,
    stdio: 'inherit',
  });
  winston.log('info', `Updated ${filePath}`);
  spawnSync('sudo apachectl restart', [], {
    shell: true,
    stdio: 'inherit',
  });
  winston.log('info', 'restarted apache2');
}

module.exports = class Hosts {
  init(appName) { // eslint-disable-line class-methods-use-this
    const {hosts, filePath} = store.getState().hosts;
    return updateHostsFile(hosts, filePath);
  }

  update(appName) { // eslint-disable-line class-methods-use-this
    const {hosts} = store.getState().hosts;
    return updateHostsFile(hosts, filePath);
  }
};
