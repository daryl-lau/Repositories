const crypto = require('crypto');

const secret = 'a@#$dHJG%$sd^@ds12GDE23';   // 盐

module.exports = {
    // md5 密码加密
    md5(buffer) {
        const hash = crypto.createHash('md5');
        hash.update(buffer);
        hash.update(secret);
        return hash.digest('hex')
    },
};