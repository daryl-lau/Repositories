const Koa = require('koa');
const Router = require('koa-router');
const Static = require('./static');
const session = require('koa-session');
const fs = require('fs');
const db = require('./libs/db');

let server = new Koa();
server.listen(8080);


server.keys = fs.readFileSync('./.keys').toString().split('\n');

server.use(session({
    key: 'ID',
    maxAge: 20 * 60 * 1000,
    renew: true
}, server));

server.context.db = db;

server.use(async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        ctx.throw(500, e)
    }
});

let router = new Router;

router.use('/admin', require('./routers/admin'));

Static(router, {
    html: 1,
    image: 1,
    style: 1,
    javascript: 1
});


server.use(router.routes());