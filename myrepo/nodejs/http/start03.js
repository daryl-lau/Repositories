const http = require('http');
const url = require('url');
const util = require('util');


http.createServer((req, res)=>{
    // res.write(url.parse(req.url, true));
    // console.log(req.url);

    // url.parse()方法可以将请求的url路径进行拆分
    console.log(url.parse(req.url, true));
    // console.log(url.parse(req.url, true).host);

    // 下面这样输出会报错，因为第一个参数必须要是字符串类型，所以需要使用util.inspect()方法将对象转换成字符串
    // res.write(url.parse(req.url, true).host);

    // util是工具模块，util.inspect()方法可以将对象转换为字符串，常用于调试和错误我输出；
   res.write(util.inspect(url.parse(req.url, true)));
   res.end()
}).listen(3000);