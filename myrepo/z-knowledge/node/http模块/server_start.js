const http = require('http');

let server = http.createServer();

server.listen('8080');

server.on('request', (req, res) => {
    console.log(req.url);
    res.end('hhhh')
})