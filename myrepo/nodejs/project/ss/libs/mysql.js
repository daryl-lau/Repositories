const mysql = require('mysql');
const co = require('co-mysql');

let connect = mysql.createPool({host: 'localhost', port: 33306, user: 'root', password: 'baihuzi.com', database: 'info'});

let db = co(connect);

module.exports = db;