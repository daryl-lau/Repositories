const Router = require('koa-router');

let router = new Router();

router.get('/', ctx=>{
    ctx.body='index'
});

router.use('/admin', require('./admin'));

module.exports = router.routes();