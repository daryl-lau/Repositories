const koa = require('koa');

// 路由使用另一个模块实现
const Router = require('koa-router');

let server = new koa();
server.listen(8080);


let router = new Router();

router.get('/a', async (ctx, next) => {

    // koa中，ctx理解为上下文，处理函数参数将req，res进行了整合进ctx中，另外还加入了其他东西
    // 处理函数是异步函数

    console.log(ctx.req);
    console.log(ctx.res);

    // 返回数据直接在ctx的body中
    ctx.body = 'aaaaaa';

    // 如果需要调用next()， 需要再前面加 await, 因为下一个处理函数也是async的
    await next();
});


// express中，use会处理所有请求，get、post等
// koa中，use只是用作中间件，处理所有的请求使用 all 来处理

server.use(router.routes());