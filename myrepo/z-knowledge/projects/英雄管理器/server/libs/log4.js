const log4js = require('koa-log4');
const path = require('path')

log4js.configure({
    appenders: {
        access: {
            type: "dateFile",           // 以日期的方式存放日志
            filename: path.resolve(__dirname, '../logs/access'),
            pattern: ".yyyy-MM-dd.log",   // 日志格式，最小只能以小时为一个文件
            alwaysIncludePattern: true,
            encoding: 'utf-8',
        },

        app: {
            type: "dateFile",           // 以日期的方式存放日志
            filename: path.resolve(__dirname, '../logs/app'),
            pattern: ".yyyy-MM-dd.log",   // 日志格式，最小只能以小时为一个文件
            alwaysIncludePattern: true,
            encoding: 'utf-8',
        },

        out: {
            type: 'console'
        }
    },
    categories: {
        default: { appenders: ['out'], level: 'info' },
        // 分类可以按照应用级别的方式来分
        // 比如访问级别，应用级别，系统级别
        access: { appenders: ['access'], level: 'info' },
        app: { appenders: ['app'], level: 'WARN' }
    }
});

// koa-log4的错误级别会覆盖掉access里面定义的，auto在koa-log4里面做了处理，map 200-299 to INFO, 300-399 to WARN and 400-599 to ERROR.
module.exports.accessLogger = () => log4js.koaLogger(log4js.getLogger('access'), { level: 'auto' });
module.exports.appLogger = log4js.getLogger('app');