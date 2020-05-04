const fs = require('fs');

let readStream = fs.createReadStream('./files/video.mp4');
let writeStream = fs.createWriteStream('./files/new_video.mp4');

// 读取流每次只读64kb的数据，防止读取大文件时，一次性文件读取卡死

// 下面的都是流事件
// 每读取一次数据(64kb)，触发一次事件，把读取出来的数据传给写入流写入；
readStream.on('data', data => {
    console.log(data);
    writeStream.write(data);
});

// 出现错误时抛出错误
readStream.on('error', error => {
    throw error;
});

// 读取流结束时
readStream.on('end', () => {
    console.log('读取流结束');

    // 写入流不会自动关闭，这里必须要手动关闭，避免不确定的麻烦
    writeStream.close();
});


// 写入流结束时
writeStream.on('finish', () => {
    console.log('写入流结束');
})


readStream.once('open', () => {
    console.log('读取流打开');
});

readStream.once('close', () => {
    console.log('读取流关闭');
});

writeStream.once('open', () => {
    console.log('写入流打开');
});
writeStream.once('close', () => {
    console.log('写入流关闭');
})

// 可以手动关闭读取流和写入流
// readStream.close();
// writeStream.close();