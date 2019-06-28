const Router = require('koa-router');

let router = new Router();

// 直接请求 /user 的，返回
router.get('/', async cxt=>{
    cxt.body = '用户';
});


// 如果路由和请求有重名，谁写在前面用谁
// router.get('/vip', async cxt=>{
//     cxt.body = '用户vip';
// });

// 请求 /user/company 的，到company.js 里面找
// 请求 /user/common 的，common.js 里面找
// 请求 /user/vip 的，vip.js 里面找
router.use('/company', require('./company'));
router.use('/common', require('./common'));
router.use('/vip', require('./vip'));

module.exports = router.routes();