const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-session');


let server = new Koa();
server.listen(8080);

// cookie循环秘钥
server.keys = [
    'sdf7as9d8f7asd7f9sdfa9s',
    'sdfasd6fgjhgjgdgjsfgsf5',
    'nk54h3k2klj78kh89kh5kh3',
];

server.use(session({
    key: 'ID',  // session名字，默认为 koa:sess
    maxAge: 20 * 60 * 1000,  // 有效期
    renew: true          //自动续期
}, server));

let router = new Router();

router.get('/', async ctx => {
    if (!ctx.session['view']) {
        ctx.session['view'] = 1
    } else {
        ctx.session['view'] ++
    }

    ctx.body = `欢迎你${ctx.session.view}次访问本站！`
});

server.use(router.routes());
