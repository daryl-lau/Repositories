const Router = require('koa-router');
const path = require('path');
let router = new Router();

router.get('/login', async ctx=>{
    await ctx.render('login', {})
});

module.exports = router.routes();