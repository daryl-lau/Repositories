const http = require('http');
const mysql = require('mysql');
const co = require('co-mysql');

let connect = mysql.createPool({host: 'localhost', port: 3306, user: 'root', password: '', database: 'test'});

// 用co-mysql将数据库连接包起来，就可以用async将异步转为同步了
let db = co(connect);

http.createServer(async (req, res) => {
    await db.query('SELECT * FROM user_t', (err, data) => {
        if (err) {
            throw err
        } else {
            console.log(data);
            res.write('ok');
            res.end();
        }
    });
}).listen(8080);