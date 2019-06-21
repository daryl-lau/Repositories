let http = require('http');
let url = require('url');

http.createServer((req, res)=>{

    console.log(req.url);   //   /aaa?username=admin&password=123123

    res.write(JSON.stringify(url.parse(req.url, true).query));


    // querystring的parse方法可以将请求的数据转化为对象，通过&符分割
    // let result = querystring.parse(query);
    // console.log(result);  //   { username: 'admin', password: '123123' }
    //
    // console.log(result.username);   // admin
    // console.log(result.password);   // 123123
    res.end()
}).listen(3000);