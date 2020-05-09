const mysql = require('mysql');
const db_config = require('./db.config')

// let db = mysql.createConnection({host: 'localhost', port: 3306, user: 'root', password: '', database: 'test'});

let db = mysql.createPool(db_config);
// 连接池，最大连接数默认为10，可以用connectionLimit参数自定义
// let db = mysql.createPool({connectionLimit: 20, host: 'localhost', port: 3306, user: 'root', password: '', database: 'users'});


// 查询结果以回调函数的方式返回，返回err和data，data是返回结果的一个数组，哪怕只有一条数据也是一个数组
db.query(`INSERT INTO users(username, password, birthday) VALUES ('test_user111', 'pass', '19990904')`, (err, data) => {
    if (err) {
        throw err
    } else {
        console.log(data);
    }
    db.query('SELECT * FROM users', (err, data) => {
        if (err) {
            throw err
        } else {
            console.log(data);
        }
    });
});


