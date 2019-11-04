const http = require('http');

const allowOrigin = {
    'http://localhost:63342': true,
    'https://localhost:63342': true,
};

http.createServer((req, res) => {

    console.log(req.headers);
    let {origin} = req.headers;

    // 跨域声明
    if (allowOrigin[origin]) {
        res.setHeader("Access-Control-Allow-Origin", "*");
    }
    res.write('成功');
    res.end()

}).listen(8080);