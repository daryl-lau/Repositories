const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');


let server = new Koa();
server.listen(8080);



let router = new Router();

router.get('/', async ctx => {
    ctx.body = 'OK';
});

server.use(router.routes());


// 静态文件路径声明
// 需要放在路由之后，否则如果静态文件名字为index.html，且将这个放在路由之前，将会先请求静态文件index.html，谁在前面先请求谁
// server.use(static('./static'));


// router.get('/', async ctx => {
//     ctx.body = 'OK';
// });

// 这两句话，哪个写在前面则先匹配谁
// 一般把静态文件声明放在路由后面

server.use(static('./static'), {
    // 静态文件缓存在客户端的时间，如果在此时间内，服务端的文件发生修改，客户端的不会变
    // 对于不经常变的文件，此时间可以设久一点
    maxAge: 86400 * 1000,

    // 默认文件名，访问 / 时默认访问的文件
    index: 'index.html'
});