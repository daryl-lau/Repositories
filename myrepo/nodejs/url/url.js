let http = require('http');
let url = require('url');

http.createServer((req, res)=>{

    // url模块获取请求的域名后的uri，此uri可以通过querystring模块解析成对象
    console.log(req.url);   //   /aaa?username=admin&password=123123

    // url.parse()方法可以将请求的url路径进行拆分
    console.log(url.parse(req.url, true));

    res.write(JSON.stringify(url.parse(req.url, true)));
    res.end()

}).listen(3000);