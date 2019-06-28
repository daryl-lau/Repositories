const Router = require('koa-router');

let router = new Router();


// 请求 /user/common 的，返回
router.get('/', async cxt=>{
    cxt.body = '普通用户';
});

router.get('/aaa', async cxt=>{
    cxt.body = '普通用户aaa'
});

module.exports = router.routes();