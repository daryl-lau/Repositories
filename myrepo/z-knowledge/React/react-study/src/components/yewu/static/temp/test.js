const fs = require('fs')
const crypto = require('crypto')

// let file = fs.readFileSync('./V975333-01.iso')
let file = fs.readFileSync('../upload/V975333/V975333-01.iso-chunk-0')



const hash = crypto.createHash('md5');
hash.update(file);
let result = hash.digest('hex');
console.log(result);