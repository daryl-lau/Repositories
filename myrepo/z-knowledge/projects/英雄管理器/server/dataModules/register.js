let db = require('../database');

/**
 * 新增英雄信息
 */
module.exports = function register(arr) {
    return new Promise((resolve, reject) => {
        let sql = 'insert into users (userName,password,phone) values (?,?,?)';
        db.query(sql, arr, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}