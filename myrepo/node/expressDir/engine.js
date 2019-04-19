const express = require('express');
const path = require('path');
const app = express();

// app.use(express.static(path.join(__dirname, 'static')));

// 1、指定属兔所在的位置
app.set('views', path.join(__dirname, 'views'));


// 2、注册模板引擎
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index.ejs', {'lists':['徐凤年', '温华', '曹长卿']});
});

app.listen(3000);