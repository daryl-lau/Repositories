const http = require('http');

http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.write('data');
    res.end();
}).listen(8000);