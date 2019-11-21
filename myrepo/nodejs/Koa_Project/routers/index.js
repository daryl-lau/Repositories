const Router = require('koa-router');
const path = require('path');


let router = new Router();

router.get('/', ctx=>{
    ctx.body='/'
});

router.use('/admin', require('./admin'));

module.exports = router.routes();