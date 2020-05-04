const fs = require('fs');

let readStream = fs.createReadStream('./Buffer和字符之间转换.js');

let str = '';
let arr = [];
readStream.on('data', (buffer) => {
    console.log(buffer);
    str += buffer;
    arr.push(buffer);
})

readStream.on('end', () => {
    console.log(str);
    console.log(arr);
    console.log(Buffer.concat(arr).toString());
    console.log('end');
})