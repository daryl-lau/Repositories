const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')

let { accessLogger, appLogger } = require('./log4')

let app = new Koa();
app.listen(8080);

// 直接在中间建中使用log4里面抛出的方法即可
app.use(accessLogger())

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    await next()
})

let router = new Router();

router.get('/', ctx => {    
    ctx.body = 'access'
})

router.get('/info', ctx => {
    ctx.status = 503;
    ctx.body = 'server error'

})

router.get('/api', async ctx => {
    try {
        throw new Error('error');
    } catch (e) {
        appLogger.error(e)
    }
})

app.use(router.routes())