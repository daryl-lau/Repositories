const Koa = require('koa');
const Router = require('koa-router');
const betterBody = require('koa-better-body');
const session = require('koa-session');
const fs = require('fs')
const ejs = require('koa-ejs');
const path = require('path')
const koaJwt = require('koa-jwt')
const { accessLogger } = require('./libs/log4')


const cors = require('koa2-cors');

let app = new Koa();
app.listen(8080);

app.use(accessLogger())

// 声明静态资源路径
app.use(require('./routers/staticRoute'));

// 跨域处理
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/api') {
            return false;   // 不允许/api跨域
        }
        return '*';         // 允许其他
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// 全局错误处理
// app.use(async (ctx, next) => {
//     try {
//         await next();
//     } catch (e) {
//         console.log(e);
//         ctx.throw(500, '服务器内部错误')
//     }
// })

// ejs
ejs(app, {
    // 指定模板的根目录
    root: path.resolve(__dirname, './views'),

    // 是否启动ejs外层包装，默认true，建议不开启，如果开启，请求时就不能直接请求文件了，而是名为layout的文件，没卵用，不开启
    layout: false,

    // 模板的后缀名
    // viewExt: 'ejs',

    // 是否缓存，开发环境不缓存，生产环境可缓存, 是服务器的缓存，不是客户端的，缓存后即将模板缓存，不用每次都去读磁盘
    cache: false,

    // 是否开启debug，开发环境可开启，生产环境关闭
    debug: false
});

// session
// app.keys = fs.readFileSync('./.keys').toString().split('\n')
// app.use(session({
//     key: 'ID',  // session名字，默认为 koa:sess
//     maxAge: 20 * 60 * 1000,  // 有效期
//     renew: true          //自动续期
// }, app));


// ----------------------------------- koa-jwt  路由权限控制-----------------------------------
// koa-jwt如果验证失败，会返回401状态码，捕获错误返回，自定义状态信息
// 这个中间件要定义在jwt验证之前
app.use(async (ctx, next) => {
    await next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    });
});

// jwt约定客户端的token在请求头Authorization里发送，并且token前面需要加上'Bearer ' 标识，jwt才会进行处理
let publicKey = fs.readFileSync(path.resolve(__dirname, './public.pem'))
app.use(koaJwt({ secret: publicKey }).unless({
    path: [/^\/api\/login$/, /^\/api\/register$/, /^\/favicon\.ico$/]
}))

// 一旦jwt验证成功，就会在ctx.state.user上存放验证后的payload字段
app.use(async (ctx, next) => {
    console.log(ctx.state.user);
    await next()
})
// ----------------------------------- koa-jwt  路由权限控制-----------------------------------




// 文件上传模块
app.use(betterBody({
    uploadDir: './static/uploads',
}));



// 路由中间件
let router = new Router();
router.use('', require('./routers'));
app.use(router.routes());



