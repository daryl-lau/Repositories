const mysql = require('mysql');
const db_config = require('./db.config')

// let db = mysql.createConnection({ host: 'localhost', port: 33306, user: 'root', password: 'baihuzi.com', database: 'study' });

let db = mysql.createPool(db_config);
// 连接池，最大连接数默认为10，可以用connectionLimit参数自定义
// let db = mysql.createPool({connectionLimit: 20, host: 'localhost', port: 33306, user: 'root', password: 'baihuzi.com', database: 'study'});

let user = 'user54';
let pass = 'password';
let birthday = '19930111';

db.query(`INSERT INTO users(username, password, birthday) VALUES ('${user}','${pass}', '${birthday}')`, (err, data) => {
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


// 防止SQL注入，使用以下方法
db.query('INSERT INTO users(username, password, birthday) VALUES (?,?,?)', ['user55', pass, birthday], (err, data) => {
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