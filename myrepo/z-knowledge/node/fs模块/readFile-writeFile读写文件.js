const fs = require('fs');


// writeFile写入文档,会覆盖原有的内容
// 回调函数只有err参数
fs.writeFile('./files/readFile-writeFile.txt', 'hahaha', (err) => {
    if (!err) {
        console.log('写入成功');
    } else {
        throw err
    }
})

// fs.readFile('文件路径', '选项', 'callback')
// 读取到的数据data是buffer格式的，如果想要转成可识别的文字，可以传入选项'utf-8'，或者对获取到的data使用toString()方法
fs.readFile('./files/readFile-writeFile.txt', (err, data) => {
    if (!err) {
        console.log(data);
    } else {
        throw err
    }
});
// 使用utf-8选项
fs.readFile('./files/readFile-writeFile.txt', 'utf-8', (err, data) => {
    if (!err) {
        console.log(data);
    } else {
        throw err
    }
});
// 使用toString()方法
fs.readFile('./files/readFile-writeFile.txt', (err, data) => {
    if (!err) {
        console.log(data.toString());
    } else {
        throw err
    }
})