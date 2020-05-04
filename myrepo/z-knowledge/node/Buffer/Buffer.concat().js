const fs = require('fs');

let readStream = fs.createReadStream('./Buffer和字符之间转换.js');


// Buffer.concat()可以把buffer流的数组整合成一个完整的buffer

let arr = [];
readStream.on('data', (buffer) => {
    arr.push(buffer);
})

readStream.on('end', () => {
    console.log(arr);
    console.log(Buffer.concat(arr));
    console.log(Buffer.concat(arr).toString());
    console.log('end');
})