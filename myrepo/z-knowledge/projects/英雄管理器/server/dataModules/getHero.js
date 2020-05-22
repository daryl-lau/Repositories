let db = require('../database');

/**
 * 获取所有英雄信息
 */
// module.exports = function () {
//     return new Promise((resolve, reject) => {
//         let sql = 'select id,name,gender,img from heros where isDelete = 0 order by id';
//         db.query(sql, (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(data);
//             }
//         })
//     })
// }

module.exports = () => {
    let sql = 'select id,name,gender,img,isDelete from heros where isDelete = 0 order by id';
    return db.query(sql)
}
