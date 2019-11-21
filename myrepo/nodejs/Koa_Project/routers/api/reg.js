const Router = require('koa-router');
const path = require('path');
let {md5} = require('../../libs/common');
// 使用同步的文件读取模块
const fs = require('await-fs');

let router = new Router();

router.get('/', async ctx => {
    await ctx.render('reg', {})
});

router.post('/', async ctx => {

    let {username, password} = ctx.request.fields;
    let data = await ctx.db.query(`SELECT * FROM USER_T WHERE USERNAME='${username}'`);
    if (data.length !== 0) {
        ctx.body = '用户已存在'
    } else {
        let data = await ctx.db.query('INSERT INTO USER_T(username, password) VALUES (?,?)', [username, md5(password)]);
        ctx.body = '注册成功，跳转中...';
        ctx.set('refresh', '2;URL=login')
    }
});

module.exports = router.routes();