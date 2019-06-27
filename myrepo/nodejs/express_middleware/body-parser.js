const express = require('express');

// body-parser 用于解析post请求的body数据，只能解析字符数据，不能解析文件数据
const bd_parser = require('body-parser');

let server = express();
server.listen(8080);

// body-parser中间件需要放在路由请求之前
server.use(bd_parser.urlencoded({extended: false}));

server.post('/a', (req, res, next)=>{
    // 解析后的请求会放在req的body属性里面
    console.log(req.body);
});