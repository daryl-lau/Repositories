let db = require('../database');

/**
 * 新增英雄信息
 */
module.exports = function login(arr) {
    return new Promise((resolve, reject) => {
        let sql = 'select password from users where username=?';
        db.query(sql, arr, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}