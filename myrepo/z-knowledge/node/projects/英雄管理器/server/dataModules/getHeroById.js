let db = require('../database');

/**
 * 获取英雄信息
 */
module.exports = function getHero(arr) {
    return new Promise((resolve, reject) => {
        let sql = 'select id,name,gender,img from heros where id=?';
        db.query(sql, arr, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}