const log4js = require("log4js");
log4js.configure({
    appenders: {
        log_file: {
            type: "file",               // 以文件大小的方式存放日志
            filename: "./logs/File.log",
            maxLogSize: 10485760,       // 文件轮循大小，单位是字节，这里设置10M
            backups: 30,                // 保存的轮循日志的数量
            encoding: 'utf-8',
            keepFileExt: true           // 保持文件扩展名(.log)在后面
        },

        log_date: {
            type: "dateFile",           // 以日期的方式存放日志
            filename: './logs/dateFileTest',
            pattern: "yyyy-MM-dd-hh.log",   // 日志格式，最小只能以小时为一个文件
            alwaysIncludePattern: true,
            encoding: 'utf-8',
        },

        // 以文件大小的方式还是文件日期的方式选其中一个就行
        // 上面只是做演示，一般选择统一一个即可，我喜欢按日期存放
        // 省去了按天归档的麻烦

        access: {
            type: "dateFile",           // 以日期的方式存放日志
            filename: './logs/access',
            pattern: "yyyy-MM-dd.log",   // 日志格式，最小只能以小时为一个文件
            alwaysIncludePattern: true,
            encoding: 'utf-8',
        },

        app: {
            type: "dateFile",           // 以日期的方式存放日志
            filename: './logs/app',
            pattern: "yyyy-MM-dd.log",   // 日志格式，最小只能以小时为一个文件
            alwaysIncludePattern: true,
            encoding: 'utf-8',
        },

        out: {
            type: 'console',
        }
    },
    categories: {
        default: { appenders: ['out'], level: 'info' },
        log_file: {  // default表示log4js.getLogger()获取找不到对应的category时，使用default中的日志配置
            appenders: ['log_file'],
            level: "error"
        },
        log_date: {
            appenders: ["log_date"],
            level: "trace"
        },

        // 分类可以按照应用级别的方式来分
        // 比如访问级别，应用级别，系统级别
        access: { appenders: ['access'], level: 'info' },
        application: { appenders: ['app'], level: 'WARN' }
    }
});

const logger = log4js.getLogger();  // 走default
const logger1 = log4js.getLogger("log_date");


logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.error(new Error('sadasdasd'));
logger.fatal("Cheese was breeding ground for listeria.");

logger1.trace("Entering cheese testing");
logger1.debug("Got cheese.");
logger1.info("Cheese is Comté.");
logger1.warn("Cheese is quite smelly.");
logger1.error("Cheese is too ripe!");
logger1.error(new Error('sadasdasd'));
logger1.fatal("Cheese was breeding ground for listeria.");