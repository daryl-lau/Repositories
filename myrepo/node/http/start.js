const http = require('http');



/*
   req 请求相关
   res 响应相关
 */
let server = http.createServer((req, res)=>{
    let url = req.url;
    console.log(req.complete);
    console.log(req.httpVersion);
    console.log(req.url);
    console.log(req.headers);
    console.log(req.method);
    res.end('url:' + url);
});

// 运行服务器，端口号可以任意修改
server.listen(3000);