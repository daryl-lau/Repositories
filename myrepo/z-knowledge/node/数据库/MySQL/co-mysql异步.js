const http = require('http');
const mysql = require('mysql');
const co = require('co-mysql');
const db_config = require('./db.config')

console.log(db_config);
let connect = mysql.createPool(db_config);

// 用co-mysql将数据库连接包起来，就可以用async将异步转为同步了
let db = co(connect);

http.createServer(async (req, res) => {
    await db.query('SELECT * FROM users', (err, data) => {
        if (err) {
            throw err
        } else {
            console.log(data);
            res.write(JSON.stringify(data));
            res.end();
        }
    });
}).listen(8080);