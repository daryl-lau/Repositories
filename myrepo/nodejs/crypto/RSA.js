const crypto = require('crypto')
const fs = require('fs')

const privatepem2 = fs.readFileSync('../token/jsonwebtoken/private.pem');//私有key【需要 pem 编码的key】server.pem
const publicpem2 = fs.readFileSync('../token/jsonwebtoken/public.pem');//公有key【需要 pem 编码的key】cert.pem
const prikey2 = privatepem2.toString();
const pubkey2 = publicpem2.toString();


let message = '我是RSA非对称加密字符串内容'

let enc_by_pub = crypto.publicEncrypt(publicpem2, Buffer.from(message, 'utf8'));
console.log('encrypted by public key: ' + enc_by_pub.toString('hex'));

// 使用私钥解密:
let dec_by_prv = crypto.privateDecrypt(privatepem2, enc_by_pub);
console.log('decrypted by private key: ' + dec_by_prv.toString('utf8'));





