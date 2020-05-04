const express = require('express');

const app = express();


// app.use((req, res, next) => {
//     console.log(111);
//     next();
// });


// // 中间件，可以单独匹配某个uri, 只有当访问/cc时，此中间件才会执行
// app.use('/cc', (req, res, next) => {
//     console.log('cccc');
//     next();
// });


// ---------------------------------------------------------------------
// 中间件如果没有res.end()，而是使用的next()，则会继续执行下面匹配到的代码
// app.get('/',(req, res, next)=>{
//     res.write('hello!1111');
//     next();
// });

// app.get('/', (req, res, next) => {
//     res.write('hello!1111');
//     next();
// });

// app.get('/', (req, res) => {
//     res.write('hello!2222');
//     res.end()
// });



app.get('/api/getUsers', (req, res) => {
    // 在express中，可以使用send代替write
    // send会自动识别发送的内容，并设置相对应的响应头
    // send会自动end，无需自己手动res.red()
    res.send({ a: 12, b: 12 });
});




// 如果要向下面的步骤传参，可以直接放到req上面，但是注意不要和系统自带的参数冲突
// app.get('/c', (req, res, next) => {
//     req.userData = 'jerry';
//     next()
// });

// app.get('/c', (req, res, next) => {
//     console.log(req.userData);
// });




app.listen(3000);