const http = require('http');

let server = http.createServer();

server.listen('3000');

server.on('request', (req, res) => {
    console.log(req.url);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(JSON.stringify({ name: 'jerry', age: 18 }));
})