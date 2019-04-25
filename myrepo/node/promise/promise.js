const fs = require('fs');

// 1、创建promise对象，一经创建，立马执行
new Promise((resolve, reject)=>{
    fs.readFile()
})