
// 将字符串转换为buffer，默认字符集是utf-8，可以省略不写
let bufferStr = Buffer.from('天不生我李淳罡，剑道万古如长夜', 'utf-8');

// buffer都是二进制数据，但打印出来是16进制的格式，只是为了好看一点，实际上还是二进制数据
console.log(bufferStr);
console.log(bufferStr.toString('utf-8'));   // 天不生我李淳罡，剑道万古如长夜s




// base64字符编码支持的字符较少，如果有不支持的字符，就会变成乱码
// 支持0-9 a-z A-Z
let base64Str = Buffer.from('0123456789abcdeABCDE', 'base64');
console.log(base64Str);
console.log(base64Str.toString('base64'));


{
    // utf8 转为 base64/hex
    let output = Buffer.from('utf8的字符串', 'utf8')
    console.log(output.toString('base64'))
    console.log(output.toString('hex'))
}


{
    // base64/hex 转为 utf8
    output = Buffer.from('75746638e79a84e5ad97e7aca6e4b8b2', 'hex')
    console.log(output.toString('utf8'))
    output = Buffer.from('dXRmOOeahOWtl+espuS4sg==', 'base64')
    console.log(output.toString('utf8'))
}


{
    const fs = require('fs')
    // 读取文件传入编码
    let fileBuffer = fs.readFileSync('test.txt')  // 默认是二进制 Buffer
    console.log(fileBuffer)
    let fileBufferUTF8 = fs.readFileSync('test.txt', 'utf8')
    console.log(fileBufferUTF8)
    let fileBufferBASE64 = fs.readFileSync('test.txt', 'base64')
    console.log(fileBufferBASE64)
    let fileBufferHEX = fs.readFileSync('test.txt', 'hex')
    console.log(fileBufferHEX)
}