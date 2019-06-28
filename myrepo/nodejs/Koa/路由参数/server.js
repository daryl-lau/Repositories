const Koa = require('koa');
const Router = require('koa-router');

let server = new Koa();
server.listen(8080);

let router = new Router();

//  这里的 :id 是严格匹配，有几个:id，就需要对应几个路径，否则not found
router.get('/news/:id', async ctx=>{
    console.log(ctx.params);
    let {id} = ctx.params;
    ctx.body = `新闻_${id}`;
});


server.use(router.routes());