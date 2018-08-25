const {store, reducerRegistry} = require('@devly/devly-store');

reducerRegistry.register('hosts', require('./reducers'));
