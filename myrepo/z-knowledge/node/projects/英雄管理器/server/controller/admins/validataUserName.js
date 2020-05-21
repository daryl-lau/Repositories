let validataUserName = require('../../dataModules/validataUserName');



module.exports = async ctx => {
    let { username } = ctx.query;
    await validataUserName(username).then(
        (data) => {
            if (data[0]) {
                ctx.body = { code: 201, msg: '用户名已存在' }
            } else {
                ctx.body = { code: 200, msg: '用户名可用' }
            }
        }
    );
}