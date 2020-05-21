let addHero = require('../../dataModules/addHero');

// module.exports = async ctx => {
//     let { name, gender, img } = ctx.request.fields;
//     await addHero([name, gender, img]).then((data) => {
//         ctx.body = { code: 200, msg: '插入数据成功' }
//     }).catch(e => {
//         ctx.body = { code: 208, msg: '插入数据失败' }
//     })
// }

module.exports = async ctx => {
    let { name, gender, img } = ctx.request.fields;
    let data = await addHero([name, gender, img])
    ctx.body = { code: 200, msg: '插入数据成功' }
}