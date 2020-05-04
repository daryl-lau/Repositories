const http = require('http');

let server = new http.Server();

server.on('request', (req, res) => {
    console.log(req);


    /*
    向请求的客户端发送响应头。
    该函数在一个请求内最多只能调用一次，如果不调用，则会自动生成一个响应头。
    因为实际开发中,我们需要返回对应的中文以及对应的的文本格式
    所以我们需要设置对应的响应头,响应头决定了对应的返回数据的格式以及编码格式

    response.writeHead(statusCode, [reasonPhrase], [headers])
    接收参数：
        第一个是HTTP状态码，如200(请求成功），404（未找到）等。
        第二个是告诉浏览器发送的数据类型
        第三个就是具体发送的是什么数据
    该格式可以识别HTML结构，编码格式是UTF-8
    res.writeHead(200,{‘Content-Type’:‘text/html;charset=UTF8’});

    该格式不可以识别HTML结构
    res.writeHead(200,{‘Content-Type’:‘text/plain;charset=UTF8’});

    该格式识别图片
    res.writeHead(200,{‘Content-Type’:‘image/jpg;charset=UTF8’});

    该格式识别样式
    res.writeHead(200,{‘Content-Type’:‘text/css;charset=UFT8’});

    最后一个告诉浏览器使用什么编码解析
    */
    res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});


    res.write('<h1>Hello, World!</h1>');
    res.write('<h1>Hello, World!</h1>');
    res.write('<h1>Hello, World!</h1>');
    res.write('<h1>Hello, World!</h1>');
    res.end();
});

server.listen(3000);