const http = require('http');
const fs = require('fs');
const url = require('url');
const zlib = require('zlib');

http.createServer((req, res) => {
    let {pathname} = url.parse(req.url, true);

    let rs = fs.createReadStream('.' + pathname);

    // 如果不写错误处理函数，那么fs在找不到文件的时候，会直接抛出异常，导致程序中断
    rs.on('error', () => {
        res.writeHead(404);
        res.write('404 not found');
        res.end()
    });

    /*
    response.setHeader(name, value) / response.setHeader(name) / response.removeHeader(name)
    设置头部,获取和删除头部信息的，这个不同于 response.writeHead方法，这两个方法并没有真的把头部信息发送出去，发送头部信息只能通过调用
    response.writeHead或response.write才会发送出去。
    */

    // 设置响应头，在浏览器network 的Response Header中可以看到设置的响应头
    res.setHeader('content-encoding', 'gzip');
    let gz = zlib.createGzip();
    rs.pipe(gz).pipe(res)
}).listen(3000);