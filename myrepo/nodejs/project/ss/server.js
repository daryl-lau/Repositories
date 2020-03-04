const koa = require('koa');
const Router = require('koa-router');
const body = require('koa-better-body');
const cors = require('koa2-cors');


// const allowOrigin = {
//     'localhost:8000': true,
// };

let server = new koa();
server.listen(8000);

let router = new Router();

server.use(body({
    uploadDir: './upload',
}));

server.use(cors())

server.use(async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        ctx.throw(500, e)
    }
});

// 将db变量放到server.context上。可以在全局范围内，用ctx.db访问到变量
// server.context.db = require('./libs/mysql');


router.post('/info_in', async ctx => {
    // let data = await ctx.db.query('SELECT * FROM USER_T');
    // console.log(data);
    console.log(ctx.request.fields);
    let { user, phone } = ctx.request.fields;
    console.log(user, phone)
    ctx.body = 'aaa';
});

router.post('/info_out', async ctx => {
    // let data = await ctx.db.query('SELECT * FROM USER_T');
    // console.log(data);
    ctx.body = 'bbb';
});

router.get('/getUsers', async ctx => {
    let data = await ctx.db.query('SELECT * FROM USER_T');
    console.log(data);
    ctx.body = data;
});

server.use(router.routes());