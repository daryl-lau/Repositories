let getPass = require('../../dataModules/getPass');
let common = require('../../libs/common')

const { createToken } = require('../../libs/token')

// module.exports = async ctx => {
//     let { userName, password } = ctx.request.fields;
//     let passMd5 = common.md5(password);
//     let res = await getPass([userName]);
//     if (!res[0]) {
//         ctx.body = { code: 204, msg: '用户名或密码错误' }
//     } else {
//         if (res[0].password == passMd5) {
//             ctx.session.administrator = userName;
//             ctx.body = { code: 200, msg: '登录成功' }
//         } else {
//             ctx.body = { code: 204, msg: '用户名或密码错误' }
//         }
//     }
// }

module.exports = async ctx => {
    let { userName, password } = ctx.request.fields;
    let passMd5 = common.md5(password);
    let res = await getPass([userName]);
    if (!res[0]) {
        ctx.body = { code: 204, msg: '用户名或密码错误' }
    } else {
        if (res[0].password == passMd5) {
            await createToken({ username: userName }).then((token) => {
                ctx.body = { code: 200, msg: '登录成功', token: token }
            })
            // ctx.session.administrator = userName;
        } else {
            ctx.body = { code: 204, msg: '用户名或密码错误' }
        }
    }
}