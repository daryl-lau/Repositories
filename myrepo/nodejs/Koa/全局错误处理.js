const Koa = require('koa');
const Router = require('koa-router');


let server = new Koa();
server.listen(8080);

server.use(async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        ctx.throw(500, e)
    }
});

let router = new Router();


/*

同样可以在路由中进行错误捕获
router.all('*', async (ctx,next) => {
    try {
        await next()
    } catch (e) {
        ctx.throw(500, e)
    }
});

*/


router.get('/', async ctx => {

    // 这里的错误会在上面捕获到
    ctx.body = dada.dasd
});

server.use(router.routes());