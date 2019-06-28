const Router = require('koa-router');

let router = new Router();

router.get('/', async cxt=>{
    cxt.body = '企业用户';
});

module.exports = router.routes();