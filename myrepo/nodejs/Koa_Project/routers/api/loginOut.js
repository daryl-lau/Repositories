const Router = require('koa-router');
const path = require('path');


let router = new Router();

router.get('/', async ctx => {
    if (ctx.session.login) {
        ctx.body = `登出成功! ${ctx.session.username}`;
        ctx.session.login = null;
        ctx.session.username = null;
    }else {
        ctx.body='还未登录！'
    }
});

module.exports = router.routes();