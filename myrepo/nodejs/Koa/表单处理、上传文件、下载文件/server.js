const Koa = require('koa');
const Router = require('koa-router');
const path = require('path')
const fs = require('fs')
const static = require('koa-static')

// 文件下载所用到的模块
const send = require('koa-send');

// 使用此模块进行表单数据获取和文件上传
const body = require('koa-better-body');


let server = new Koa();
server.listen(8080);


let router = new Router();

server.use(body({
    uploadDir: './static/temp',
}));

router.post('/upload', async ctx => {
    ctx.set('Access-Control-Allow-Origin', '*');
    // 普通post和文件post都会放到这里
    console.log('fiels', ctx.request.fields);
    // console.log('files', ctx.request.files[0]);
    let file = ctx.request.files[0]
    console.log(file);
    console.log(file.path);
    console.log(file.name);

    // let readStream = fs.createReadStream(file.path);
    let filePath = path.resolve(__dirname, file.path) + path.extname(file.name);
    // console.log(filePath);
    // let writeStream = fs.createWriteStream(filePath);
    // readStream.pipe(writeStream);
    fs.renameSync(file.path, filePath);
    console.log(path.basename(filePath));

    ctx.body = { imgName: path.basename(filePath) };
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

router.get('/download/:filename', async ctx => {
    const { filename } = ctx.params;
    const path = `./download/${filename}`;
    ctx.attachment(path);
    await send(ctx, path)
});

server.use(router.routes());

server.use(static('./static'), {
    // 静态文件缓存在客户端的时间，如果在此时间内，服务端的文件发生修改，客户端的不会变
    // 对于不经常变的文件，此时间可以设久一点
    maxAge: 86400 * 1000,

    // 默认文件名，访问 / 时默认访问的文件
    index: 'index.html'
});



