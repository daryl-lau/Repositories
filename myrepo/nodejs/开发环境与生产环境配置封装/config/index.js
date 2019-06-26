const process = require('process');

module.exports = (
    process.env.OS === 'Windows_NT' ? require('./config.dev') : require('./config.prod')
);