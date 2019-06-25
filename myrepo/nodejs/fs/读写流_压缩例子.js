let fs = require('fs');

// 压缩库。nodejs自带
let zlib = require('zlib');


let rs = fs.createReadStream('./v.f30.mp4');

// 创建gz对象
let gz = zlib.createGzip();

// 这里的后缀名要改，但其实不改同样可以写，就需要自己再手动将后缀名改成gz，这样才能进行解压，后缀名是给人看的，对于写入操作没有影响
let ws = fs.createWriteStream('./new.mp4.gz');

// 中间用gz将读入流压缩，再传递给写入流
rs.pipe(gz).pipe(ws);