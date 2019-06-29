const Koa = require('koa');
const Router = require('koa-router');


let server = new Koa();
server.listen(8080);


let router = new Router();


// 所有请求 /user 的，到user index里面找
// 路由嵌套其实是字符串凭借，一层一层把路由拼接起来，/user/ 和 /user 是一样的
// 注意这里不是server.use，而是router.use
router.use('/user', require('./routers/user'));



server.use(router.routes());