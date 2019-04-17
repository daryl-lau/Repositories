

let fs = require('fs');

let fd = fs.openSync('./a.txt', 'w');

fs.writeFileSync(fd, '哈哈哈哈哈哈');

fs.closeSync(fd);

