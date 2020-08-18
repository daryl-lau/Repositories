const koa = require('koa');

// 路由使用另一个模块实现
const Router = require('koa-router');

let server = new koa();
server.listen(8080);

// server.context 是下面ctx的prototype，可以在上面添加自定义的全局属性
// 例如 server.context.a = 12; 就可以在全局范围内使用 ctx.a 来访问
// 一般把数据库的连接什么的放在里面 server.context.db = mysql.createPoll()......; 使用 ctx.db.query 操作数据库
server.context.a = 12;


let router = new Router();

router.get('/user', async (ctx, next) => {

    // koa中，ctx理解为上下文，处理函数参数将req，res进行了整合进ctx中，另外还加入了其他东西
    // 处理函数是异步函数

    // http的 req和res
    // console.log(ctx.req);
    // console.log(ctx.res);

    // http://localhost:8080/user?username=aaa&id=9527
    console.log(ctx.method);    // 请求的方式    GET
    console.log(ctx.url);       // 请求的url     /user?username=aaa&id=9527
    console.log(ctx.path);      // 请求的路径     /user
    console.log(ctx.query);     // 传递的参数     { username: 'aaa', id: '9527' }
    console.log(ctx.ip);        // 客户端的ip     ::1 (本地回环地址)
    console.log(ctx.headers);   // 请求头
    /*
    {   host: 'localhost:8080',
        connection: 'keep-alive',
        'cache-control': 'max-age=0',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*\/*;q=0.8,application/signed-exchange;v=b3',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        cookie: 'connect.sid=s%3AJGW8mgCRNAxaWxiOmpBtn_bUS6pSyw3-.iOQPeVQz8krJQkA4BMmeNOFRVvUDaS2w2%2F%2BYe1lot3k'
    }
    */

    // 已经解析好了，无需再用querystring进行解析
    console.log(ctx.query);

    // 返回数据直接在ctx的body中
    ctx.body = 'aaaaaa';

    // 如果需要调用next()， 需要再前面加 await, 因为下一个处理函数也是async的
    await next();

    // 报错并退出，第一个参数为状态码，第二个参数为错误信息
    // ctx.throw(400, '错了')

    // ctx.assert() 和 throw 差不多
    // ctx.assert(条件， stateCode, '错误信息')；
    // ctx.assert(ctx.query.user, 400, 'Username is required')
    // ctx.assert(ctx.query.pass, 400, 'Password is required')

    // 设置返回的状态码
    // ctx.state = 404


    // 发送文件
    // ctx.attachment

    // 重定向, 可以重定向到任意地址，站内站外都行
    // ctx.redirect('/news')
    // ctx.redirect('http://www.baidu.com')
    ctx.status = 307
    ctx.redirect('/news')
});


server.use(router.routes());