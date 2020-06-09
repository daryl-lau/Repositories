const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs')
const static = require('koa-static')

const betterBody = require('koa-better-body');


let server = new Koa();
server.listen(3002);


let router = new Router();

server.use(betterBody({}));

server.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'x-requested-with,Content-Type,Authorization');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.status = 200;
    } else {
        await next();
    }
})

router.post('/addUser', async ctx => {
    ctx.set('Access-Control-Allow-Origin', '*');
    // 普通post和文件post都会放到这里
    console.log(ctx.request.fields);
    ctx.body = 'ok';
});

router.post('/submit', async ctx => {
    ctx.set('Access-Control-Allow-Origin', '*');
    console.log(ctx.request.fields);
    let filename = ctx.request.fields.imgName;
    let readStream = fs.createReadStream('./static/temp/' + filename);
    let writeStream = fs.createWriteStream('./static/upload/' + filename);
    readStream.pipe(writeStream);
    ctx.body = { code: 200, msg: '提交成功' };
})

server.use(router.routes());

server.use(static('./static'), {
    // 静态文件缓存在客户端的时间，如果在此时间内，服务端的文件发生修改，客户端的不会变
    // 对于不经常变的文件，此时间可以设久一点
    maxAge: 86400 * 1000,

    // 默认文件名，访问 / 时默认访问的文件
    index: 'index.html'
});



