// 实现真正的业务处理
// 核心模块
var fs = require('fs')
var path = require('path')
var queryString = require('querystring')
var myurl = require('url')

// 1.引入 第三方模块
var formidable = require('formidable')
var template = require('art-template')


// 用户自定义模块
var dataModule = require('./dataModule')

exports.getinfo = (req, res) => {
   setTimeout(() => {
                res.send('这是服务器返回的信息')
            }, 3000);
    
}

// 获取users.json文件中的所有数据并返回
exports.getUserList = (req, res) => {
    fs.readFile(__dirname + '/data/users.json', 'utf-8', function (err, data) {
        if (err) {
            var retobj = {
                "code": 201,
                "msg": "获取失败"
            }
            res.send(JSON.stringify(retobj))
        } else {
            var retobj = {
                "code": 200,
                "msg": "获取成功",
                data: JSON.parse(data)
            }
            res.send(JSON.stringify(retobj))
        }
    })
}

exports.doRegister = (req, res) => {
    var obj = req.body
    dataModule.doRegister(req.body, (err) => {
        if (err) {
            console.log(err)
            var retobj = {
                "code": 201,
                "msg": "注册失败"
            }
            res.end(JSON.stringify(retobj))
        } else {
            var retobj = {
                "code": 200,
                "msg": "注册成功"
            }
            setTimeout(() => {
                res.end(JSON.stringify(retobj))
            }, 5000);
        }
    })
}

exports.addUser = (req, res) => {
    var obj = req.body
    console.log(obj);
    dataModule.addUser(obj,function(err){
        if (err) {
            var retobj = {
                "code": 201,
                "msg": "注册失败"
            }
            res.end(JSON.stringify(retobj))
        } else {
            var retobj = {
                "code": 200,
                "msg": "注册成功"
            }
            res.end(JSON.stringify(retobj))
        }
    })
}

exports.getcode = (req, res) => {
    var arr = []
    for (var i = 0; i < 6; i++) {
        arr.push(Math.floor(Math.random() * 10))
    }
    res.end(JSON.stringify({ code: arr.join('') }))
}

exports.getregister = (req, res) => {
    fs.readFile(__dirname + '/views/register.html', (err, data) => {
        if (err) {
            res.end('404')
        } else {
            res.end(data)
        }
    })
}

exports.getjson = (req, res) => {
    fs.readFile(__dirname + "/data/json.json", (err, data) => {
        // res.end(data.toString())
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
        if (err) {
            res.end('{code:201,"msg":"读取错误"}')
        } else {
            res.end(data.toString())
        }
    })
}

exports.getxml = (req, res) => {
    fs.readFile(__dirname + "/data/xml.xml", (err, data) => {
        if (err) {
            res.end('err')
        } else {
            res.end(data.toString())
        }
    })
}

exports.validataUserName = (req, res) => {
    var name = myurl.parse(req.url, true).query.name
    dataModule.validataUserName(name, (err, data) => {
        var retobj = {
            "code": '',
            "msg": ""
        }
        if (err) {
            console.log(err)
            retobj.code = 401
            retobj.msg = '服务器异常'
            res.header("refresh", "3;url=http://127.0.0.1:5500/day1/04-%E4%BB%A3%E7%A0%81/01-login.html");
        } else {
            if (data) {
                retobj.code = 401
                retobj.msg = '当前用户名已存在，请换一个'
                res.header("refresh", "3;url=http://127.0.0.1:5500/day1/04-%E4%BB%A3%E7%A0%81/01-login.html");
            } else {
                retobj.code = 200
                retobj.msg = '用户名可用'
                res.header("refresh", "3;url=http://127.0.0.1:5500/day1/04-%E4%BB%A3%E7%A0%81/01-login.html");
            }
        }
        res.send(JSON.stringify(retobj))
    })
}


exports.getalldata = (req, res) => {
    dataModule.getAllData((err, data) => {
        if (err) {
            res.json({ code: 201, msg: '获取数据失败' })
        } else {
            res.json({ code: 200, msg: '获取数据成功', data: data })
        }
    })
}

// 1.展示首页动态数据结构：req.url = '/' req.method = 'GET'
// 动态结构   数据 + 模板
exports.getIndexPage = (req, res) => {
    dataModule.getAllData((err, data) => {
        if (err) {
            console.log(err)
            res.end('404')
        } else {
            res.render(__dirname + "/views/index.html", { heros: data })
        }
    })
}
// 2.静态资源的加载:req.url.indexOf()   req.method = 'GET'
exports.getStaticSource = (req, res) => {
    fs.readFile(__dirname + req.url, (err, data) => {
        if (err) {
            res.end('404')
        } else {
            res.end(data)
        }
    })
}
// 3.展示添加英雄的静态页面：req.url = '/add' req.method = 'GET'
exports.getAddPage = (req, res) => {
    fs.readFile(__dirname + '/views/add.html', (err, data) => {
        if (err) {
            res.end('404')
        } else {
            res.end(data)
        }
    })
}
// 4.实现添加英雄的操作：req.url = '/add' req.method = 'POST'
exports.doAdd = (req, res) => {
    // 接收用户数据
    // 将数据添加到json文件
    // 返回操作结构
    // 如果只是一些普通键值对数据，那么我们也可以直接使用node自带的事件来实现数据的接收
    // node支持传递大容量的参数，所以它也支持分批接收参数，每镒接收的都是字符串
    // req.on(data,(chunk)=>{}):每次接收参数都会触发data事件，每次接收参数的一部分,chunk就是这一次接收到的参数数据
    // req.on(end):当参数全部接收完毕，就会自动的触发end事件
    dataModule.insertHero(req.body, (err) => {
        if (err) {
            var retobj = {
                "code": 201,
                "msg": "新增失败"
            }
            res.end(JSON.stringify(retobj))
        } else {
            var retobj = {
                "code": 200,
                "msg": "新增成功"
            }
            res.end(JSON.stringify(retobj))
        }
    })
}
// 5.实现图片的上传功能：req.url = '/uploadFile' req.method = 'POST'
exports.doFileUpload = (req, res) => {
    // 实现图片的上传功能
    // 2.创建formidable对象，这个对象可以帮助我们实现文件的上传(接收数据，存储)
    var form = new formidable.IncomingForm()
    // 3.设置编码格式，它是用来设置传递的普通的表单数据
    form.encoding = 'utf-8';
    // 4.设置上传文件的存储目录:有问题》我希望各位能够自行解决>>雄哥解决了
    form.uploadDir = __dirname + "/public/images";
    // 5.设置保留文件的扩展名
    form.keepExtensions = true
    // 6.实现文件的上传操作，如果上传完成(不管成功还是失败都叫完成)了，就会自动的触发下面这个函数
    // req:请求报文，用户传递的数据就存储在请求报文对象中
    // 回调函数：
    // err:如果上传错误，err就是错误对象
    // fields：上传的表单普通数据--字段键值对
    // files：上传的文件对象
    form.parse(req, function (err, fields, files) {
        if (err) {
            var obj = {
                "code": 201,
                "msg": "上传失败"
            }
            res.end(JSON.stringify(obj))
        } else {
            // files.img.path获取的是文件的全路径(目录+文件名)，但是我们的数据中只需要文件名，意味着我们需要处理这个path,获取最后一个部分(upload_3c7ca8a3bbffd40a99e3b3fbe234cb5d.jpg)
            // path.basename方法可以获取当前指定路径的最后一部分
            console.log(files);
            var filename = path.basename(files.img.path)
            // console.log(filename)
            // 我们从后台返回的数据，如果没有特别需要，一般都是json格式的字符串
            var obj = {
                "code": 200,
                "msg": "上传成功",
                "img": filename
            }
            res.end(JSON.stringify(obj))
        }
    });
}
// 6.展示编辑动态页面：req.url = '/edit' req.method = 'GET'
exports.getEditPage = (req, res) => {
    // 1.获取id号
    // 第二个参数如果设为 true，则返回的 URL 对象的 query 属性会是一个使用 querystring 模块的 parse() 生成的对象。 如果设为 false，则 query 会是一个未解析未解码的字符串。 默认为 false
    var id = myurl.parse(req.url, true).query.id
    // 2.根据id号获取数据
    dataModule.getHeroById(id, (err, hero) => {
        if (err) {
            var retobj = {
                "code": 201,
                "msg": "编辑页面打开失败"
            }
            res.end(JSON.stringify(retobj))
        } else {
            // 3.读取编辑的模板页面，结合数据生成动态页面并返回
            // console.log(hero)
            var html = template(__dirname + "/views/edit.html", hero)
            res.end(html)
        }
    })

}
// 7.实现编辑操作：req.url = '/edit' req.method = 'POST'
exports.doEdit = (req, res) => {
    // 接收用户参数
    dataModule.editHero(req.body, (err) => {
        if (err) {
            var retobj = {
                "code": 201,
                "msg": "编辑失败"
            }
            res.end(JSON.stringify(retobj))
        } else {
            var retobj = {
                "code": 200,
                "msg": "编辑成功"
            }
            res.end(JSON.stringify(retobj))
        }
    })
    // 实现用户数据的编辑
    // 返回操作结果
}
// 8.实现删除操作：req.url = '/delete' req.method = 'GET'
exports.doDelete = (req, res) => {
    // 获取id
    var id = myurl.parse(req.url, true).query.id
    dataModule.deleteHeroById(id, (err) => {
        if (err) {
            var retobj = {
                "code": 201,
                "msg": "删除失败"
            }
            res.end(JSON.stringify(retobj))
        } else {
            var retobj = {
                "code": 200,
                "msg": "删除成功"
            }
            res.end(JSON.stringify(retobj))
        }
    })
}


// 9.获取登陆静态页面
exports.getLoginPage = (req, res) => {
    res.render(__dirname + "/views/login.html")
}
// 10.实现用户登陆
exports.doLogin = (req, res, next) => {

    console.log('-------')
    console.log(req.body)
    console.log('-------')


    var obj = req.body
    // 根据 用户名  查询数据
    dataModule.login(obj.username, (err, data) => {
        if (err) {
            // 使用express中扩展的json方法，返回一个json格式字符串
            res.json({ code: 201, msg: '登陆失败' })
        } else {
            // 判断是否返回了结果集数据
            if (data) { //查找到了数据
                if (data.userpwd == obj.userpwd) {
                    // 实现登陆状态保持
                    req.session.isLogin = "true"
                    req.session.currentUser = obj

                    res.json({ code: 200, msg: '登陆成功' })
                } else {
                    res.json({ code: 201, msg: '密码错误' })
                }
            } else {//根据用户名没有查找到数据
                res.json({ code: 201, msg: '用户名不存在' })
            }
        }
    })
}

//退出
exports.exit = (req, res) => {
    // 在express中，通过delete关键字可以删除指定的session数据
    delete req.session.isLogin
    res.redirect('/login')
}

// 查询单个用户
exports.getHeroById = (req, res) => {
    var id = myurl.parse(req.url, true).query.id
    // 2.根据id号获取数据
    dataModule.getHeroById(id, (err, hero) => {
        if (err) {
            var retobj = {
                "code": 201,
                "msg": "查询失败"
            }
            res.end(JSON.stringify(retobj))
        } else {
            res.end(JSON.stringify(hero))
        }
    })
}