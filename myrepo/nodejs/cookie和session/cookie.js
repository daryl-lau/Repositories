const express = require('express');
const cookieParser = require('cookie-parser');

let server = express();
server.listen(8080);

// cookie不跨域

/*
一、浏览器允许每个域名所包含的cookie数：

    Microsoft指出InternetExplorer8增加cookie限制为每个域名50个，但IE7似乎也允许每个域名50个cookie。

    Firefox每个域名cookie限制为50个。

    Opera每个域名cookie限制为30个。

    Safari/WebKit貌似没有cookie限制。但是如果cookie很多，则会使header大小超过服务器的处理的限制，会导致错误发生。

    注：“每个域名cookie限制为20个”将不再正确！

二、当很多的cookie被设置，浏览器如何去响应。

    除Safari（可以设置全部cookie，不管数量多少），有两个方法：

    最少最近使用（leastrecentlyused(LRU)）的方法：当Cookie已达到限额，自动踢除最老的Cookie，以使给最新的Cookie一些空间。Internet Explorer和Opera使用此方法。

    Firefox很独特：虽然最后的设置的Cookie始终保留，但似乎随机决定哪些cookie被保留。似乎没有任何计划（建议：在Firefox中不要超过Cookie限制）。

三、不同浏览器间cookie总大小也不同：

    Firefox和Safari允许cookie多达4097个字节，包括名（name）、值（value）和等号。

    Opera允许cookie多达4096个字节，包括：名（name）、值（value）和等号。

    Internet Explorer允许cookie多达4095个字节，包括：名（name）、值（value）和等号。

    注：多字节字符计算为两个字节。在所有浏览器中，任何cookie大小超过限制都被忽略，且永远不会被设置。
*/

// 解析客户端发过来的cookie，存放到req.cookies中
server.use(cookieParser(
    // cookie签名
    'dfs^^%dfsf8&&fs8&^%%&ssdfs'
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
        // 比如 www.baidu.com 访问 baidu.com的cookie，但是baidu.com不能访问 www.baidu.com的cookie
        // 所以一般把cookie设置的域名为主域名，通过domain来配置
        // 域名不能随便写，否则设置cookie会失败
        domain: 'localhost',

        // 路径也是一样，下层路径可以访问上层路径的cookie，上层路径不能访问下层路径的cookie
        // 比如 /user/aaa 可以访问 /user 的cookie， /user 不能访问 /user/aaa 的cookie
        // 所以一般把路径设置为 '/' ， 通过path来配置
        path: '/',

        // 设置cookie只能由服务器操作
        httpOnly: true,

        // 只有https
        // secure: true,

        // 签名,需要配合上面的签名秘钥一起使用
        signed: true
    });

    res.send('ok')
});