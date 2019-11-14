const http = require('http');
const fs = require('fs');
const url = require('url');
const zlib = require('zlib');

http.createServer((req, res) => {
    let {pathname} = url.parse(req.url, true);
    let filepath = '.' + pathname;


    // fs.stat检测文件状态
    fs.stat(filepath, (err, stat) => {
        console.log(err, stat);
        if (err) {
            res.writeHead(404);
            res.write('404 not found');
            res.end()
        } else {
            let rs = fs.createReadStream(filepath);
            rs.on('error', () => {
            });
            res.setHeader('content-encoding', 'gzip');
            let gz = zlib.createGzip();
            rs.pipe(gz).pipe(res)
        }
    });
}).listen(3000);