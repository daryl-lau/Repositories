const fs = require('fs');

let readStream = fs.createReadStream('./files/createReadStream--读写流.txt');

// option {flags: 'a'} 表示以追加的方式写入流
let writeStream = fs.createWriteStream('./files/createWriteStream-读写流.txt', { flags: 'a' });

readStream.pipe(writeStream);