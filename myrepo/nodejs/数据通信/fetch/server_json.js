const http = require('http');

http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.write(JSON.stringify({name: 'jerry', age: 18}));
    res.end();
}).listen(8000);