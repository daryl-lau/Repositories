const { verifyToken } = require('../../libs/token')

module.exports = async ctx => {
    let { authorization } = ctx.headers;
    await verifyToken(authorization)
        .then(() => {
            ctx.body = { code: 200, msg: '已登录' }
        })
        .catch(() => {
            ctx.body = { code: 201, msg: '未登录' }
        })
}