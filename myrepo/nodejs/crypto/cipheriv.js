const crypto = require('crypto');

let data1 = "天不生我李淳罡，";
let data2 = "剑道万古如长夜";
let data3 = "Bearer CtTYwdqLFSs4djblABabQd7ywwsCphqJGH2PnWZ1fMKvge4ml5wd78EebpJRudHfyb_dsYg3oSCljEBMbZaEa7zlfxg0S4y0sHyEK6OnNX68FkbxW9_bcc5eL6yqgdFFJ1_bAnq3igZcOmjhZC9CzyyxOMj05JdhWo9pBjFcoKuPfFQldZ2hPDN_U3_sbIk2LsrsHuz9imjj1d2HbV4cL2BW1Wj3M75n5ab4sPa15ueAw"


let clearEncoding = 'utf8';
let cipherEncoding = 'hex';

// 算法，秘钥，iv偏移量
// 算法如aes192，aes-128-ecb，aes-256-cbc等，128秘钥需要16位，192需要24位，256需要32        位
// 参数都必须是 'utf8' 编码的字符串、Buffer、 TypedArray 或 DataView
// 如果密码不需要初始化向量，则 iv 可以为空
let algorithm = 'aes-128-ecb';
let key = 'qwertyuiopasdfgh';
let iv = "";
let cipher = crypto.createCipheriv(algorithm, key, iv);

let cipherChunk = [];
// cipherChunk.push(cipher.update(data1, clearEncoding, cipherEncoding))
// cipherChunk.push(cipher.update(data2, clearEncoding, cipherEncoding))
cipherChunk.push(cipher.update(data3, clearEncoding, cipherEncoding))
cipherChunk.push(cipher.final(cipherEncoding))
console.log(cipherChunk.join(''));

let decipher = crypto.createDecipheriv(algorithm, key, iv);
let plainChunk = [];
for (let i = 0; i < cipherChunk.length; i++) {
    plainChunk.push(decipher.update(cipherChunk[i], cipherEncoding, clearEncoding));

}
plainChunk.push(decipher.final(clearEncoding));
console.log("UTF8 plaintext deciphered: " + plainChunk.join(''));
