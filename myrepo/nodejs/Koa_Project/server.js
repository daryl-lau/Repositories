const Koa = require('koa');
const Router = require('koa-router');
const Static = require('./static');

let server = new Koa();
server.listen(8080);

let router = new Router;


Static(router, {
    html: 1,
    image: 1,
    style: 1,
    javascript: 1
});


server.use(router.routes());