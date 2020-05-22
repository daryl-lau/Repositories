let getHero = require('../../dataModules/getHero');

module.exports = async ctx => {
    await getHero().then((data) => {
        ctx.body = { code: 200, msg: '获取数据成功', data: data }
    })
}