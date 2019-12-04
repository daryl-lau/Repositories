let http = require('http');
let querystring = require('querystring');

http.createServer((req, res)=>{

    console.log(req.url);   //   /aaa?username=admin&password=123123


    let [url, query] = req.url.split('?');
    console.log(url, query);  //  /aaa username=admin&password=123123
    // 使用url的parse方法，就不用上面的这种split方法自己切分，可以直接获取到切分后的数据


    // querystring的parse方法可以将请求的数据转化为对象，通过&符分割
    let result = querystring.parse(query);   // { username: 'admin', password: '123123' }

    // querystring还有一个方法是stringify，将对象转化为请求的格式
    // { username: 'admin', password: '123123' } 转化为  username=admin&password=123123

    console.log(result);  //   { username: 'admin', password: '123123' }

    console.log(result.username);   // admin
    console.log(result.password);   // 123123

}).listen(3000);