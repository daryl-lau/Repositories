const Router = require('koa-router');
const path = require('path');
let {md5} = require('../../libs/common');

// 使用同步的文件读取模块
const fs = require('await-fs');

let router = new Router();

router.get('/', async ctx => {
    if (ctx.session['login']) {
        ctx.body = `您已登录! ${ctx.session['username']}`
    } else {
        await ctx.render('login', {})
    }

});

router.post('/', async ctx => {
    let {username, password} = ctx.request.fields;
    let pass = md5(password);
    let data = await ctx.db.query(`SELECT PASSWORD FROM USER_T WHERE USERNAME='${username}'`);
    if (data[0].PASSWORD === pass) {
        ctx.session['login'] = true;
        ctx.session['username'] = username;
        ctx.body = `登录成功! ${username}`;
    }else {
         ctx.body = '用户名或密码错误！'
    }
});

// router.post('/aaa', async ctx=>{
//     let params = ctx.request.fields;
//     console.log(params);
//     console.log(params.name);
// });

module.exports = router.routes();