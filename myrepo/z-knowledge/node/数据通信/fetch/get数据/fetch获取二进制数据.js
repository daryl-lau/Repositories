const http = require('http');
const fs = require('fs');

let server = http.createServer();
server.listen('8080');

server.on('request', (req, res) => {
    let readStream = fs.createReadStream('./ace.jpg');
    res.setHeader("Access-Control-Allow-Origin", "*");
    readStream.pipe(res);
})
