const Router = require('koa-router');
let router = new Router();

router.get('/', ctx => {
    ctx.body = 'articles'
});


router.get('/life', ctx => {
    ctx.body = 'life'
});

router.get('/travel', ctx => {
    ctx.body = 'travel'
});

module.exports = router.routes();