const express = require('express');

const app = express();


// 中间件，可以单独匹配某个uri

app.use((req, res, next)=>{
    console.log(111);
    next();
});

app.use('/cc',(req, res, next)=>{
    console.log('cccc');
    next();
});

// 中间件使用场景，1.写日志


app.get('/',(req, res)=>{
    res.write('hello!1111');
    res.end();
});


// 中间件如果没有res.end()，而是使用的next()，则会继续执行下面匹配到的代码
// app.get('/',(req, res, next)=>{
//     res.write('hello!1111');
//     next();
// });

app.get('/', (req, res)=>{
    res.write('hello!2222');
    res.end();
});

app.get('/app',(req, res)=>{
    res.write('hello,app!');
    res.end();
});




app.listen(3000);