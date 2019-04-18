const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// 配置静态文件夹
// app.use('static', express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res, next)=>{
    console.log(path.join(__dirname, 'static'));
    // res.write('aaa');
    res.end()
});

app.listen(3000);