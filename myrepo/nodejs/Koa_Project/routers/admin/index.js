const Router = require('koa-router');

let router = new Router()

router.get('/aaa', async ctx=>{
    ctx.body = 'aaa'
});

module.exports = router.routes();