const http = require('http');
const url = require('url');
const util = require('util');
const querystring = require('querystring');

// post数据是通过二进制流传输的
// post数据传输或将数据进行分片多次传输，接收数据时需要将分片的数据组合成完整的数据
// 以下方式不能用于上传文件图片，仅能用于同get方式一样的查询字符串，不同点在于get走的url，post走的body

http.createServer((req, res)=>{
    let postData = [];

    // 监听数据传输，chunk参数表示数据传递过程中分片的数据，将分片的数据组合成完整的数据
    req.on('data', (chunk)=>{
        postData.push(chunk)
    });


    // 监听到数据传输完成
    req.on('end',()=>{
        // console.log(postData);

        // Buffer.concat把数据拼接起来
        let result = Buffer.concat(postData);

        res.setHeader('content-type', 'json');

        // 如果涉及到文件图片上传，不能用toString()方法
        res.end(JSON.stringify(querystring.parse(result.toString())));
    });
}).listen(3000);