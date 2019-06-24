const http = require('http');
const mysql = require('mysql');
const co = require('co-mysql');

let connect = mysql.createPool({host: 'localhost', port: 3306, user: 'root', password: '', database: 'test'});
let db = co(connect);

http.createServer(async (req, res) => {
    await db.query('SELECT * FROM user_t', (err, data) => {
        if (err) {
            throw err
        } else {
            console.log(data);
        }
    });
}).listen(8080);