const koa = require('koa');
const Router = require('koa-router');


let server = new koa();
server.listen(8080);


let router = new Router();


// 所有请求 /user 的，到user index里面找
router.use('/user', require('./routers/user'));

server.use(router.routes());