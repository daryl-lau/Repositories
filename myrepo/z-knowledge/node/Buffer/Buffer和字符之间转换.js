
// 将字符串转换为buffer，默认字符集是utf-8，可以省略不写
let bufferStr = Buffer.from('天不生我李淳罡，剑道万古如长夜', 'utf-8');
console.log(bufferStr);
console.log(bufferStr.toString('utf-8'));   // 天不生我李淳罡，剑道万古如长夜s




// base64字符编码支持的字符较少，如果有不支持的字符，就会变成乱码
// 支持0-9 a-z A-Z + /
let base64Str = Buffer.from('0123456789/a+bc+ddsefg/ABCDEFG', 'base64');
console.log(base64Str);
console.log(base64Str.toString('base64'));
