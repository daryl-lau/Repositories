let register = require('../../dataModules/register');
let validataUserName = require('../../dataModules/validataUserName')
let common = require('../../libs/common')

module.exports = async ctx => {
    let { userName, password, phone } = ctx.request.fields;
    let passMd5 = common.md5(password)
    let res = await validataUserName([userName])
    if (res.length > 0) {
        ctx.body = { code: 202, msg: '用户名已存在，注册失败' }
    } else {
        await register([userName, passMd5, phone]);
        ctx.body = { code: 200, msg: '注册成功' }
    }
}