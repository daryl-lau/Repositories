const Router = require('koa-router');
const path = require('path');

// 使用同步的文件读取模块
const fs = require('await-fs');

let router = new Router();

router.get('/',  ctx => {
     ctx.body='admin'
});

router.get('/login', async ctx=>{
    await ctx.render('login', {})
});



router.post('/login', async ctx=>{
    let file = await fs.readFile(path.resolve(__dirname, '../../admins.json'));
    // console.log(JSON.parse(file.toString()));
    ctx.body = JSON.parse(file.toString())
});

// router.post('/aaa', async ctx=>{
//     let params = ctx.request.fields;
//     console.log(params);
//     console.log(params.name);
// });

module.exports = router.routes();