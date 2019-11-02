let http = require('http');
let url = require('url');

http.createServer((req, res) => {

    // url模块获取请求的域名后的uri，此uri可以通过querystring模块解析成对象
    console.log(req.url);   //   /aaa?username=admin&password=123123

    // url.parse()方法可以将请求的url路径进行拆分,后面加一个true参数，即可把query里面的数据直接进行querystring处理，变成对象
    console.log(url.parse(req.url, true));
    /*
    Url {
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: '?username=admin&password=123123',
        query:
            [Object: null prototype] { username: 'admin', password: '123123' },
        pathname: '/aaa',
        path: '/aaa?username=admin&password=123123',
         href: '/aaa?username=admin&password=123123' }
    */


    res.write(JSON.stringify(url.parse(req.url, true).query));
    res.end()

}).listen(3000);