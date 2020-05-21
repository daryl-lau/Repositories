const Router = require('koa-router');
let router = new Router();

router.get('/', ctx => {
    ctx.body = 'admin'
});


router.get('/a', ctx => {
    ctx.body = 'admin a'
});

router.get('/b', ctx => {
    ctx.body = 'admin b'
});

module.exports = router.routes();