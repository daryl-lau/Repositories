const express = require('express');

// body-parser 用于解析post请求的body数据，只能解析字符数据，不能解析文件数据
const bd_parser = require('body-parser');

let server = express();
server.listen(8080);

// body-parser中间件需要放在路由请求之前
server.use(bd_parser.urlencoded({extended: false}));

server.post('/reg', (req, res, next) => {
    // 解析后的请求会放在req的body属性里面
    console.log(req.body);
});


// get方法不需要中间件，express自动处理，使用req.query直接获取
server.get('/b', (req, res) => {
    console.log(req.query);  // 浏览器请求 http://localhost:8080/b?a=12&b=5   返回 { a: '12', b: '5' }
});