const Koa = require('koa');
const Router = require('koa-router');
const ejs = require('koa-ejs');
const path = require('path');

let server = new Koa();
server.listen(8080);


ejs(server, {
    // 指定模板的根目录
    root: path.resolve(__dirname, './template'),

    // 是否启动ejs外层包装，默认true，建议不开启，如果开启，请求时就不能直接请求文件了，而是名为layout的文件，没卵用，不开启
    layout: false,

    // 模板的后缀名
    viewExt: 'ejs',

    // 是否缓存，开发环境不缓存，生产环境可缓存, 是服务器的缓存，不是客户端的，缓存后即将模板缓存，不用每次都去读磁盘
    cache: false,

    // 是否开启debug，开发环境可开启，生产环境关闭
    debug: true
});


let router = new Router();

router.get('/list', async ctx=>{

    // 渲染需要时间，等待渲染完毕再返回，加上await，
    // render第一个参数是模板的名字，不用带后缀名，因为在上面已经定义后缀名了
    // render第二个参数是模板中需要用到的变量，直接在对象中传入，这个数据一般是从数据库中获取
    await ctx.render('a', {
        arr: [1,2,3,4,5,6,7,8,9]
    })
});


server.use(router.routes());