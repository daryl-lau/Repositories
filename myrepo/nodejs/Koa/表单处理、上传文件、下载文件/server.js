const Koa = require('koa');
const Router = require('koa-router');
const send = require('koa-send');

// 使用此模块进行表单数据获取和文件上传
const body = require('koa-better-body');


let server = new Koa();
server.listen(8080);


let router = new Router();

server.use(body({
    uploadDir: './upload',
}));

router.post('/upload', async ctx => {

    // 普通post和文件post都会放到这里
    console.log(ctx.request.fields);

    ctx.body = '上传成功';
});


router.get('/download', async ctx => {
    const path = `./download/pic.png`;
    ctx.attachment(path);
    await send(ctx, path)
});

server.use(router.routes());


