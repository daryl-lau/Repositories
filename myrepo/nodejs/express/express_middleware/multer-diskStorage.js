const express = require('express');

// 上传文件永远不要在中间件中使用，最好在处理上传文件的接口中使用

// multer 用于解析post请求的文件数据，只能解析文件数据，不能解析字符数据
const multer = require('multer');

let server = express();
server.listen(8080);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
    }
});

let obj = multer({storage: storage});


// 可以控制上传的文件类型，any表示全部接受
// 上传文件永远不要在中间件中使用，最好在处理上传文件的接口中使用
server.post('/upload', obj.any(), (req, res, next) => {
    // 上传后的信息会放在req的file属性里面
    console.log(req.files);
});