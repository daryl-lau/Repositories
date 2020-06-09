const crypto = require('crypto');

const hash = crypto.createHash('md5');


hash.update('123');

// 多个update，会将各个update的值拼接到一起
// hash.update('123');
// hash.update('456');
// 想当于hash.update('123456');

let result = hash.digest('hex');

console.log(result);