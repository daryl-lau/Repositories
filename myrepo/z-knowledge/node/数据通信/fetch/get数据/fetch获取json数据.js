const http = require('http');

let server = http.createServer();

server.listen('8080');

server.on('request', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(JSON.stringify({ name: 'jerry', age: 18 }));
})