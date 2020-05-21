const Router = require('koa-router');

router = new Router();

router.get('/', ctx => { 
    ctx.body = 'index'
})

router.use('/user', require('./user'))
router.use('/admin', require('./admin'))
router.use('/articles', require('./articles'))

module.exports = router.routes();