const Router = require('koa-router');

let router = new Router();

router.get('/', async cxt=>{
    cxt.body = 'vip用户';
});

module.exports = router.routes();