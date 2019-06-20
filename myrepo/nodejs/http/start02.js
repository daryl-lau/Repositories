const http = require('http');

let server = new http.Server();

server.on('request', (req, res) => {
    console.log(req);
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello, World!</h1>');
    res.write('<h1>Hello, World!</h1>');
    res.write('<h1>Hello, World!</h1>');
    res.write('<h1>Hello, World!</h1>');
    res.end();
});

server.listen(3000);