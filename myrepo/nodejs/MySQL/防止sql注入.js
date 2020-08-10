const mysql = require('mysql');

// let db = mysql.createConnection({host: 'localhost', port: 3306, user: 'root', password: '', database: 'test'});

let db = mysql.createPool({host: 'localhost', port: 33306, user: 'root', password: 'baihuzi.com', database: 'test'});
// 连接池，最大连接数默认为10，可以用connectionLimit参数自定义
// let db = mysql.createPool({connectionLimit: 20, host: 'localhost', port: 3306, user: 'root', password: '', database: 'users'});

const user = 'test_user';
const pass = 'password';
const age = 12;

db.query(`INSERT INTO user_t(user_name, password, age) VALUES ('${user}','${pass}', '${age}')`, (err, data) => {
    if (err) {
        throw err
    } else {
        console.log(data);
    }
    db.query('SELECT * FROM user_t', (err, data) => {
        if (err) {
            throw err
        } else {
            console.log(data);
        }
    });
});


// 防止SQL注入，使用以下方法
db.query('INSERT INTO user_t(user_name, password, age) VALUES (?,?,?)', [user, pass, age], (err, data) => {
    if (err) {
        throw err
    } else {
        console.log(data);
    }
    db.query('SELECT * FROM user_t', (err, data) => {
        if (err) {
            throw err
        } else {
            console.log(data);
        }
    });
});