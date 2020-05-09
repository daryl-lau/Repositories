// Express是第三方模块
// 1.引入Express
var express = require('express')
var path = require('path')
// 状态保持
var session = require('express-session')
var bodyParser = require('body-parser')
// 2.创建服务器
var app = express()
// 3.添加对端口的监听
app.listen(3002, () => {
    console.log('http://127.0.0.1:3002')
})
// 添加body-parse解析器
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 设置允许跨域
var allow = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
  }
app.use(allow)

// 添加静态资源托管
app.use(express.static('public'))
// 添加模板引擎的配置
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});

// 添加session的中间件处理，只有添加这个中间件才能使用express-session
app.use(session({
    secret: '加一个只有你自己的知道的key',
    resave: false, 
    saveUninitialized: false,
}))




// 4.添加对用户请求的监听， 同时实现业务处理
var router = require('./router')
app.use(router)