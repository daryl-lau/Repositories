const mysql = require('mysql');
const co = require('co-mysql');

let connect = mysql.createPool({host: 'localhost', port: 3306, user: 'root', password: '', database: 'test'});

let db = co(connect);

module.exports = db;