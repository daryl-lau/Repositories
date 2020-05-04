const fs = require('fs');

// node中，相对路径不是相对于文件的路径，而是相对于node命令执行的路径

fs.readFile('./file/a.txt', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    } else {
        console.log(data);
    }
});

// 此时，如果此文件在path模块中执行，则读取的是 D:\Microsoft VS Code\Repositories\myrepo\z-knowledge\node\path模块\file\a.txt'
// 如果是在node文件夹中执行node .\path模块\node中相对路径问题.js，则此时读取的是 D:\Microsoft VS Code\Repositories\myrepo\z-knowledge\node\file\a.txt'
