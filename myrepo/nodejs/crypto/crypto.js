const crypto = require('crypto');

const hash = crypto.createHash('md5');

// 多个update，会将各个update的值拼接到一起
hash.update('123');
hash.update('456');

let result = hash.digest('hex');

console.log(result);