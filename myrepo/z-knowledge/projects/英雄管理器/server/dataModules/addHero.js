let db = require('../database');

/**
 * 新增英雄信息
 */
// module.exports = function getHero(arr) {
//     return new Promise((resolve, reject) => {
//         let sql = 'insert into heros (name,gender,img) values (?,?,?)';
//         db.query(sql, arr, (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(data);
//             }
//         })
//     })
// }

module.exports = (arr) => {
    let sql = 'insert into heros (name,gender,img) values (?,?,?)';
    return db.query(sql, arr)
}

