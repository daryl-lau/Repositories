let http = require('http');
let url = require('url');

http.createServer((req, res) => {

    console.log(req.url);   //   /aaa?username=admin&password=123123

    // url模块parse方法可以传递参数true，直接将请求的数据转化为对象
    let result = url.parse(req.url, true);
    console.log(result);
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
        query: [Object: null prototype] { username: 'admin', password: '123123' },
        pathname: '/aaa',
        path: '/aaa?username=admin&password=123123',
        href: '/aaa?username=admin&password=123123'
    }
*/

    let {pathname, query} = result;
    console.log(pathname, query);  //  /aaa  [Object: null prototype] { username: 'admin', password: '123123' }

}).listen(3000);