const express = require('express');

let server = express();
server.listen(8080);


// 静态文件中间件需要放在路由请求之后，否则，如果有接口名和静态文件名重名，将会先请求静态文件，导致接口失效
// 如果写在这里，比如static文件夹中有一个名为a的文件，将会请求文件a，而不是接口a
// server.use(express.static('./static'));

server.get('/a', (req, res, next)=>{
    res.send('aaaaaa')
});

// 静态文件中间件需要放在路由请求之后，否则，如果有接口名和静态文件名重名，将会先请求静态文件，导致接口失效
server.use(express.static('./static'));