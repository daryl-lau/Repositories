let delHero = require('../../dataModules/delHero');

module.exports = async ctx => {
    let { id } = ctx.request.fields;
    await delHero([id]).then((data) => {
        ctx.body = { code: 200, msg: '删除数据成功' }
    })
}