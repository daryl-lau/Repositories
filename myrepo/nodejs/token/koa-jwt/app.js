const Koa = require('koa');
const Router = require('koa-router')
const betterBody = require('koa-better-body');
const jwt = require('jsonwebtoken')
const koaJwt = require('koa-jwt')

// 假用户数据
const user = { username: 'jerry', password: '123456' }

// jwt 秘钥
const jwtSecret = 'sdD(Sdsdfsd^%8ds^^&5s'


let app = new Koa()
app.listen(3000);

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next()
})

app.use(betterBody());

let router = new Router();


// 登录判断，成功就发送token
router.post('/login', async ctx => {
    let { username, password } = ctx.request.fields;
    console.log(username, password);
    if (!username) {
        ctx.body = { code: 201, msg: '用户名不存在' };
    } else if (user.password === password) {
        let token = jwt.sign({ username }, jwtSecret, { expiresIn: 60 * 20 })
        ctx.body = { code: 200, msg: '登录成功', data: token }
    } else {
        ctx.body = { code: 202, msg: '密码错误' }
    }
})


// ---------------------------------koa-jwt----------------------------------
// 验证失败时捕获401，返回自定义信息
app.use(function (ctx, next) {
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    });
});

app.use(function (ctx, next) {
    if (ctx.url.match(/^\/public/)) {
        ctx.body = 'unprotected\n';
    } else {
        return next();
    }
});

router.get('/aa', async ctx => {
    ctx.body = 'aa'
})


// 默认校验在请求头中的[ Authorization: Bearer TOKEN ] 头,'Bearer ' (后面有一个空格)
// token不合法或者过期都会返回401错误
// koa-jwt会校验使用中间件了之后的后面的所有路由，上面的/public不会被校验，而下面的/api会被校验，
// 至于 / aa和 / bb则都会被校验，因为app.use(router.rouotes())在这之后
// 另外定义在unless中路由也不会被校验
app.use(koaJwt({ secret: jwtSecret }).unless({ path: [/^\/login/] }))

// ---------------------------------koa-jwt----------------------------------

app.use(function (ctx) {
    if (ctx.url.match(/^\/api/)) {
        ctx.body = 'protected\n';
    }
});

router.get('/bb', async ctx => {
    ctx.body = 'bb'
})

app.use(router.routes())