let fs = require('fs');

// let fd = fs.openSync('./a.txt', 'w');
//
// fs.writeFileSync(fd, '哈哈哈哈哈哈');
//
// fs.closeSync(fd);


// 文件操作都是异步操作

// writeFile接收三个参数，path，data，callback，callback中只有一个参数err，即写入文件的状态，成功或失败
fs.writeFile('./a.txt', '哈哈哈哈哈哈', err => {
    if (err) {
        throw err
    } else {
        console.log('写入文件成功')
    }
});

// readFile接收两个参数，path，callback，callback中有两个参数，即读取文件的状态，成功或失败，和读取到的数据
// 读取到的数据是buffer数据，可以通过toString()方法转换为可读取的数据，但是只是给人看的，返回给浏览器不需要进行toString()
fs.readFile('./b.txt', (err, data) => {
    if (err) {
        throw err
    } else {
        console.log(data);
        console.log(data.toString())
    }
});