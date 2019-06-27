const http = require('http');
const url = require('url');
const util = require('util');
const querystring = require('querystring');

// post数据是通过二进制流传输的
// post数据传输或将数据进行分片多次传输，接收数据时需要将分片的数据组合成完整的数据

http.createServer((req, res)=>{
    let postData = '';

    // 监听数据传输，chunk参数表示数据传递过程中分片的数据，将分片的数据组合成完整的数据
    req.on('data', (chunk)=>{
        postData += chunk;
    });


    // 监听到数据传输完成
    req.on('end',()=>{
        console.log(postData);
        // querystring.parse()查询字符串，可以将url查询字符串解析为键值对的集合
        postData = querystring.parse(postData);
        res.setHeader('content-type', 'json');
        res.end(JSON.stringify(postData));
    });
}).listen(3000);