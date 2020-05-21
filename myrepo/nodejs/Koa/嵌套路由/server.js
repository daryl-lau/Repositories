const Koa = require('koa');
const Router = require('koa-router');


let server = new Koa();
server.listen(8080);


let router = new Router();


router.all('*', async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        ctx.throw(500, e)
    }
});

// 路由嵌套其实是字符串拼接，一层一层把路由拼接起来
// 注意这里不是server.use，而是router.use
// router中的use只能用于引用的方式，如果需要同时处理get和post请求，使用route.all

// 路由入口，所有的路由将会去routers的index.js里面找
router.use('', require('./routers'));


// 把路由添加给server
server.use(router.routes());