const http = require('http');
const fs = require('fs');
const url = require('url');
const zlib = require('zlib');

http.createServer((req, res) => {
    let {pathname} = url.parse(req.url, true);

    let rs = fs.createReadStream('.' + pathname);

    // 如果不写错误处理函数，那么fs在找不到文件的时候，会直接抛出异常，导致程序中断
    rs.on('error', () => {
        res.setHeader('content-encoding', 'deflate');
        res.writeHead(404);
        res.write('404 not found');
        res.end()
    });

    // 设置响应头，在浏览器network 的Response Header中可以看到设置的响应头
    // 如果不设置该响应头，则通过gzip压缩后，浏览器请求的时候会将请求的内容通过下载的方式下载下来，
    // 因为不设置这个，浏览器不认识gzip格式的文件
    res.setHeader('content-encoding', 'gzip');

    let gz = zlib.createGzip();
    rs.pipe(gz).pipe(res)
}).listen(3000)