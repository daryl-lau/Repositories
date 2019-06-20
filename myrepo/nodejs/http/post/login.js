const http = require('http');
const url = require('url');
const util = require('util');
const querystring = require('querystring');

http.createServer((req, res)=>{
    let postData = '';

    // 监听数据传输，chunk参数表示数据传递过程中分片的数据，将分片的数据组合成完整的数据
    req.on('data', (chunk)=>{
        postData += chunk;
    });
    req.on('end',()=>{
        // querystring.parse()查询字符串，可以将url查询字符串解析为键值对的集合
        postData = querystring.parse(postData);
        res.end(util.inspect(postData));
    });
}).listen(3000);