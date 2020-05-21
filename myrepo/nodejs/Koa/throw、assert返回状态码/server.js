const Koa = require('koa');
const Router = require('koa-router');

let server = new Koa();
server.listen(8080);

let router = new Router();

router.get('/a', ctx => {
    let { user, pass } = ctx.query;
    console.log(user, pass);
    if (!user || !pass) {
        // throw(code, msg)接收两个参数，一个是返回的状态码，一个是错误信息,只能是字符串，如果需要传递对象，需要使用JSON.stringify
        // 注意，ctx.throw会重置请求头，因此ctx.throw不能跨域
        ctx.throw(400, '参数错误');
        // ctx.throw(400, JSON.stringify({ msg: '参数错误' }));

        // ctx.assert(条件, code, msg)，和断言一样，第一个参数是条件，后面两个参数和throw一样
        ctx.assert()
    } else {
        ctx.body = 'success';
    }
})


router.get('/b', ctx => {
    let { user, pass } = ctx.query;
    console.log(user, pass);
    // ctx.assert(条件, code, msg)，和断言一样，第一个参数是条件，后面两个参数和throw一样
    ctx.assert(user, 400, 'user is required');
    ctx.assert(pass, 400, 'pass is required');
    ctx.body = 'success'
})

server.use(router.routes());