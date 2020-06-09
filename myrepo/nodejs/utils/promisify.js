const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile);

// promisify 可以把标准的node异步函数转化为promise对象
// 什么是标准的node异步函数，就是函数最后一个参数接收一个回调，并且是错误优先的回调

readFile('./a.txt').then(
    data => console.log(data.toString())
).catch(
    err => console.log(err)
)
