let getHeroById = require('../../dataModules/getHeroById');

module.exports = async ctx => {
    let { id } = ctx.query;
    await getHeroById([id]).then((data) => {
        ctx.body = { code: 200, msg: '获取数据成功', data: data };
    })
}