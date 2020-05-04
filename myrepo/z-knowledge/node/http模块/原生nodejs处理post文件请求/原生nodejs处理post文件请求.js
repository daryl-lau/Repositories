const http = require('http');
const fs = require('fs');

let server = http.createServer();
server.listen('3000');

server.on('request', (req, res) => {
    let arr = [];
    req.on('data', buffer => {
        arr.push(buffer);
    });
    req.on('end', () => {
        console.log(Buffer.concat(arr));
    })
    console.log(req.headers);
})