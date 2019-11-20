

// cookie是koa自带的，不需要第三方模块

const Koa = require('koa');
const Router = require('koa-router');


let server = new Koa();
server.listen(8080);


let router = new Router();


// cookie循环秘钥
server.keys = [
    'sdf7as9d8f7asd7f9sdfa9s',
    'sdfasd6fgjhgjgdgjsfgsf5',
    'nk54h3k2klj78kh89kh5kh3',
];


// 设置cookie和获取cookie的时候，都需要进行签名，保证数据的安全性

router.get('/', ctx=>{
    // name value
    ctx.cookies.set('user2', 'bhz2', {
        // cookie里有属性这里都有
        signed: true,
        maxAge: 86400 * 1000
    })
});

router.get('/cookie', ctx=>{
    let cookie = ctx.cookies.get('user2', {
        signed: true
    });
    console.log(cookie);
});

server.use(router.routes());