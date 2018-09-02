# Introduction

Hosts plugin for `@devly` cli manager built on redux and yargs.  Assumes env uses apache proxy-server.

# Installation

To add devly-hosts plugin to your project, first make sure your project is set-up to consume Devly plugins (see https://github.com/aorinevo/devly-example#introduction).

Next, install `@devly/devly-hosts`:

```bash
npm i @devly/devly-hosts
```

# Integration

Use `addHostsConfig` action creator to update the hosts state in the devly-store.  It is recommneded to place the initialState for hosts in a `manifests/hosts.js` file and requiring that file within the file that dispatches the action.

```js
// mainfests/hosts.js

module.exports = {
  filePath: '/etc/hosts',
  projectPath: '/etc',
  hosts: [
    {
      ip: '127.0.0.1',
      dns: 'some.dns.example1.com'
    },
    {
      ip: '127.0.0.1',
      dns: 'some.dns.example2.com'
    },
    {
      ip: '127.0.0.1',
      dns: 'some.dns.example3.com'
    }
  ]
};
```

It is recommended that the consumer create a `plugins/index.js` barrel file for the devly plugins it consumes.

```js
// plugins/index.js

require('./hosts.js');

// plugins/hosts.js
const {store} = require('@devly/devly-store');
const {addHostsConfig, addHostsCommands} = require('@devly/devly-hosts/actions');
const {dispatch} = store;

require('@devly/devly-hosts');

dispatch(addHostsConfig(require('./manifests/hosts')));

dispatch(addHostsCommands());
```

# Technical Details

All devly plugins assume that the consumer has the following directory structure somewhere in their working directory:
```
 ├── cli.js
 ├── actions
    └── index.js
 ├── reducers
    └── index.js
 └── index.js
```

Dynamically add reducers to the store using devly's `reducerRegistry` method.
```js
const {store, reducerRegistry} = require('@devly/devly-store');

reducerRegistry.register('hosts', require('./reducers'));
```

Actions and reducers are the same actions and reducers from redux.  For more information on either, visit
 - https://redux.js.org/basics/actions, and
 - https://redux.js.org/basics/actions.

`cli.js`

```js
const store = require('../scripts/reapps/store');
const yargs = require('yargs');
const {addHostsConfig, addHostsCommands} = require('@devly/devly-hosts/actions');
const Hosts = require('@devly/devly-hosts/scripts/hosts');

store.dispatch(addHostsConfig(require('../manifests/hosts')));
store.dispatch(addHostsCommands(yargs, new Hosts(store)));

module.exports = yargs;
```
