const express = require("express");
const mysql = require("mysql");
// const cors = require("cors");
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);

const app = express();

// 配置mysql
const options = {
    host: 'localhost',
    port: 33306,
    user: 'root',
    password: 'baihuzi.com',
    database: 'session'
};

const sessionConnection = mysql.createConnection(options);

const sessionStore = new MySQLStore({
    expiration: 10800000,
    createDatabaseTable: true,  //是否创建表
    schema: {
        tableName: 'sessions',   //表名
        columnNames: {      //列选项
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, sessionConnection);

//配置中间件
app.use(session({
    key: 'aid',
    secret: "keyboard cat",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: ('name', 'value', {
        maxAge: 5 * 60 * 1000,
        secure: false,
        name: "seName",
        resave: false
    })
}));

// app.use(cors());

app.use('/login', function (req, res) {
    let { username } = req.query;
    //设置session
    console.log(username);
    console.log(req.session);
    req.session.userinfo = username;
    res.send(`登陆成功！${req.session.userinfo}`);
});

app.use('/loginOut', function (req, res) {
    //注销session
    req.session.destroy(function (err) {
        res.send("退出登录！");
    });
});

app.use('/', function (req, res) {
    //获取session
    console.log(req.session);
    if (req.session.userinfo) {
        res.send("hello " + req.session.userinfo + "，welcome to index");
    } else {
        res.send("未登陆");
    }
});

app.listen(8080);