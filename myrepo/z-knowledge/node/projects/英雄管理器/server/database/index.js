const mysql = require('mysql');
const co = require('co-mysql');
const config = require('./product.config')

let connect = mysql.createPool(config);

let db = co(connect);

module.exports = db;