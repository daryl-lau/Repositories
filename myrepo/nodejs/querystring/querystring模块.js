let http = require('http');
let querystring = require('querystring');

http.createServer((req, res)=>{

    console.log(req.url);   //   /aaa?username=admin&password=123123

    let [url, query] = req.url.split('?');
    console.log(url, query);  //  /aaa username=admin&password=123123


    // querystring的parse方法可以将请求的数据转化为对象，通过&符分割
    let result = querystring.parse(query);

    // querystring还有一个方法是stringify，将对象转化为请求的格式
    // { username: 'admin', password: '123123' } 转化为  username=admin&password=123123

    console.log(result);  //   { username: 'admin', password: '123123' }

    console.log(result.username);   // admin
    console.log(result.password);   // 123123

}).listen(3000);