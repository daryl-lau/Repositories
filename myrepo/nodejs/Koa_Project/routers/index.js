const Router = require('koa-router');

let router = new Router();

router.get('/', ctx=>{
    ctx.body='index'
});

router.use('/admin', require('./admin'));
router.use('/reg', require('./api/reg'));
router.use('/login', require('./api/login'));
router.use('/loginOut', require('./api/loginOut'));

module.exports = router.routes();