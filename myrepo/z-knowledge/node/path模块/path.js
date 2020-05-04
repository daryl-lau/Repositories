const path = require('path');

let file = './root/a/b/1.txt';

// 获取文件所在的目录
console.log(path.dirname(file));   // ./root/a/b

// 获取文件的文件名
console.log(path.basename(file));  //  1.txt

// 获取扩展名
console.log(path.extname(file));  //  .txt

// 解析文件, 绝对路径才有root，相对路径没有root
console.log(path.parse(file));   // { root:'', dir:'./root/a/b', base:'1.txt', ext:'.txt', name:'1' }

let file1 = '/root/a/b/1.txt';
let file2 = 'C:\\Windows\\System32\\drivers\\etc\\hosts';

console.log(path.parse(file1));  // { root:'/', dir:'./root/a/b', base:'1.txt', ext:'.txt', name:'1' }
console.log(path.parse(file2));  // { root:'C:\\', dir:'C:\\Windows\\System32\\drivers\\etc', base:'hosts', ext:'', name:'hosts' }

// __dirname是魔法变量，表示当前文件所在的路径
console.log(path.resolve(__dirname, '../d'));  //  d:\Microsoft VS Code\Repositories\myrepo\z-knowledge\node\d
console.log(path.resolve(__filename, '../d'));  // d:\Microsoft VS Code\Repositories\myrepo\z-knowledge\node\path模块\d