const config = require('../config/index');
const mysql = require('mysql');
const co = require('co-mysql');

const conn = mysql.createPool({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME
});

module.exports = co(conn);