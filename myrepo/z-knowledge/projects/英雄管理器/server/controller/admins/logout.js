
module.exports = async ctx => {
    ctx.session.administrator = null;
    ctx.body = { code: 200, msg: '退出成功' }
}