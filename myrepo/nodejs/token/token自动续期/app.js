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
app.listen(8080);

// 跨域设置，需要注意的是，要将Authorization头设置到Access-Control-Allow-Headers里面去，否则无法跨域发送Authorization头
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'x-requested-with,content-type,Authorization')
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.status = 200;
    } else {
        await next();
    }
})

app.use(betterBody());

let router = new Router();


// 登录接口，成功就发送token
// 发送accessToken 和 refreshToken两个token
router.post('/login', async ctx => {
    let { username, password } = ctx.request.fields;
    if (!username) {
        ctx.body = { code: 201, msg: '用户名不存在' };
    } else {
        let { username: name, password: pass } = user
        if (username == name && password == pass) {
            let token = createToken({ username })
            // ctx.status = 200
            // ctx.message = 'OK'
            ctx.body = { code: 200, msg: '登录成功', token }
        } else {
            ctx.body = { code: 202, msg: '用户名或密码错误' }
        }
    }
})

// token自动续期接口
router.post('/refreshToken', async ctx => {
    let refreshToken = ctx.headers.authorization;
    await verifyToken(refreshToken)
        .then(async (token) => {
            // 校验成功就重新发送accessToken和refreshToken
            let newToken = createToken({ username: token.username });
            // 等待一秒再返回，方便查看效果
            await sleep(1000).then(() => {
                ctx.body = { code: 200, msg: '续期成功', token: newToken }
            })
        })
        .catch((e) => {
            ctx.body = { code: 402, msg: '续期失败，请重新登录' }
        })
})


// ---------------------------------koa-jwt----------------------------------
// 验证失败时捕获401，返回自定义信息
app.use(function (ctx, next) {
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.body = { code: 401, msg: 'token expired' };
        } else {
            throw err;
        }
    });
});

// 默认校验在请求头中的[ Authorization: Bearer TOKEN ] 头,'Bearer ' (后面有一个空格)
// token不合法或者过期都会返回401错误
// 另外定义在unless中路由不会被校验
app.use(koaJwt({ secret: jwtSecret }).unless({ path: [/^\/login/, /^\/refreshToken/] }))

// ---------------------------------koa-jwt----------------------------------


// 测试接口
router.get('/a', async ctx => {
    ctx.body = { code: 200, msg: 'a' }
})

router.get('/b', async ctx => {
    ctx.body = { code: 200, msg: 'b' }
})

router.get('/c', async ctx => {
    ctx.body = { code: 200, msg: 'c' }
})

app.use(router.routes())

// 生成token函数
function createToken(obj) {
    // 为了模拟续期，把token的时效设置短一点，单位是秒
    // 生成两个token，accessToken用于接口访问，refreshToken用于请求token续期接口
    let accessToken = jwt.sign(obj, jwtSecret, { expiresIn: 15 })
    let refreshToken = jwt.sign(obj, jwtSecret, { expiresIn: 30 })
    return { accessToken, refreshToken }
}

// 校验refreshToken函数
function verifyToken(refreshToken) {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken.split(' ')[1], jwtSecret, (err, token) => {
            if (err) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })
}

// 异步延时函数
function sleep(time = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
}