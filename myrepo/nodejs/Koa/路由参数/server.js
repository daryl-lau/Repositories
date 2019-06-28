const Koa = require('koa');
const Router = require('koa-router');

let server = new Koa();
server.listen(8080);

let router = new Router();

// 这里的 :id 是严格匹配，有几个:id，就需要对应几个路径，否则not found
// 请求时 http://localhost:8080/news/id1/id2/user  中间的id1,id2被当做参数传递
router.get('/news/:id1/:id2/user', async ctx=>{
    console.log(ctx.params);
    let {id1, id2} = ctx.params;
    ctx.body = `新闻_${id1}_${id2}`;
});


server.use(router.routes());