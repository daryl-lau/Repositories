const zlib = require('zlib');
const fs = require('fs');


let gz = zlib.createGzip();

let readStream = fs.createReadStream('./files/video.mp4');
let writeStream = fs.createWriteStream('./files/video.mp4.gz');

// 通过Gzip压缩
readStream.pipe(gz).pipe(writeStream);


// 注意，压缩进去的文件解压开里面的文件名就是压缩的文件名去掉.gz的那个名字，最好带上后缀，否则压缩进去的文件是没有后缀名的



// 通过Gunzip解压
let unzip = zlib.createGunzip();

let unzipReadStream = fs.createReadStream('./files/unzip_video.mp4.gz');
let unzipWriteStream = fs.createWriteStream('./files/unzip_video.mp4')

unzipReadStream.pipe(unzip).pipe(unzipWriteStream);