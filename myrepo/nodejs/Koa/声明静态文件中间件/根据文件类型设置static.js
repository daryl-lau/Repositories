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


let staticRouter = new Router();
staticRouter.all(/(\.jpg|\.png|\.gif)$/i, static('./static', {
    maxAge: 60 * 86400 * 1000
}));

staticRouter.all(/(\.css)$/i, static('./static', {
    maxAge: 30 * 86400 * 1000
}));

staticRouter.all(/(\.html|\.htm)$/i, static('./static', {
    maxAge: 86400 * 1000
}));

staticRouter.all('', static('./static', {
    maxAge: 5 * 86400 * 1000
}));

server.use(staticRouter.routes());