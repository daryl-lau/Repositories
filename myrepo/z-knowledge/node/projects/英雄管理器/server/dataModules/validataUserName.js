let db = require('../database')

/**
 * 校验用户名是否可用
 * @function validataUserName
 * @param {string} username
 * @return {Promise} 带有数据库数据的Promise
 */
module.exports = function validataUserName(username) {
    return new Promise((resove, reject) => {
        let sql = 'select * from users where username=?'
        db.query(sql, [username], (err, data) => {
            if (err) {
                reject(err);
            } else {
                resove(data);
            }
        })
    })
}