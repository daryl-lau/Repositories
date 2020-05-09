const express = require('express');
const cookieParser = require('cookie-parser');

let server = express();
server.listen(8080);

// 解析客户端发过来的cookie，存放到req.cookies中
server.use(cookieParser(
    // cookie签名秘钥，这个确定是保密的
    'dfs^^%dfsf8&&f@*@$*@fsd2@@f@$_%)9s8&^%%&ssdfs'
));

server.get('/a', (req, res)=>{
    // 获取客户端发送过来的cookie

    // 未签名的cookie
    console.log(req.cookies);

    // 签名的cookie，如果客户端的cookie被修改了，签名不一致，获取到的值将会是false，并且将客户端的cookie重新设置回原来的
    console.log(req.signedCookies);


    // 向客户端设置cookie
    res.cookie('_id', '9527', {
        // 过期时间，单位是毫秒
        maxAge: 14 * 86400 * 1000,


        // cookie不能跨域名访问，子域名可以访问主域名的cookie，主域名不能访问子域名的cookie
        // 比如 www.baidu.com 可以访问 baidu.com的cookie，但是baidu.com不能访问 www.baidu.com的cookie
        // 所以一般把cookie设置的域名为主域名，通过domain来配置
        // 域名不能随便写，否则设置cookie会失败
        domain: 'localhost',

        // 路径也是一样，下层路径可以访问上层路径的cookie，上层路径不能访问下层路径的cookie
        // 比如 /user/aaa 可以访问 /user 的cookie， /user 不能访问 /user/aaa 的cookie
        // 所以一般把路径设置为 '/' ， 通过path来配置
        path: '/',

        // 设置这个cookie只能由服务器操作
        httpOnly: true,

        // 只有https才能使用此配置
        // secure: true,

        // 签名,需要配合上面的签名秘钥一起使用
        signed: true
    });

    res.send('ok')
});