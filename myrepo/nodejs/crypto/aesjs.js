const aesjs = require('aes-js');

function encrypt(key, iv, data) {
    let aesCbc = new aesjs.ModeOfOperation.cbc(aesjs.utils.utf8.toBytes(key), aesjs.utils.utf8.toBytes(iv));
    let encryptedBytes = aesCbc.encrypt(aesjs.utils.utf8.toBytes(data));
    return aesjs.utils.hex.fromBytes(encryptedBytes);
}

function decrypt(key, iv, crypted) {
    let aesCbc = new aesjs.ModeOfOperation.cbc(aesjs.utils.utf8.toBytes(key), aesjs.utils.utf8.toBytes(iv));
    let encryptedBytes = aesCbc.decrypt(aesjs.utils.hex.toBytes(crypted));
    return aesjs.utils.utf8.fromBytes(encryptedBytes);
}

let key = '123456789abcdefg';
console.log('加密的key:', key);
let iv = 'abcdefg123456789';
console.log('加密的iv:', iv);

// ase-js里面这种智能加密16位的字符
let data = "Thisisanexample.";

console.log("需要加密的数据:", data);
let crypted = encrypt(key, iv, data);
console.log("数据加密后:", crypted);
let dec = decrypt(key, iv, crypted);
console.log("数据解密后:", dec);