const process = require('process');

module.exports = (
    // 区分开发环境和生产环境不只有一种方法，只要找到两者不同的地方就行了
    process.env.OS === 'Windows_NT' ? require('./config.dev') : require('./config.prod')
);