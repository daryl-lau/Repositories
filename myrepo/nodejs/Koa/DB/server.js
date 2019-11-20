const koa = require('koa');
const Router = require('koa-router');

let server = new koa();
server.listen(8000);

let router = new Router();

server.use(async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        ctx.throw(500, e)
    }
});

// 将db变量放到server.context上。可以在全局范围内，用ctx.db访问到变量
server.context.db = require('./libs/mysql');

router.get('/getUsers', async ctx => {
    let data = await ctx.db.query('SELECT * FROM USER_T');
    ctx.body = data;

});

server.use(router.routes());