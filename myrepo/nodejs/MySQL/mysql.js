const mysql = require('mysql');

// let db = mysql.createConnection({host: 'localhost', port: 3306, user: 'root', password: '', database: 'test'});

let db = mysql.createPool({host: 'localhost', port: 3306, user: 'root', password: '', database: 'test'});
// 连接池，最大连接数默认为10，可以用connectionLimit参数自定义
// let db = mysql.createPool({connectionLimit: 20, host: 'localhost', port: 3306, user: 'root', password: '', database: 'users'});

db.query(`INSERT INTO user_t(user_name, password, age) VALUES ('test_user', 'pass', 12)`, (err, data) => {
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


