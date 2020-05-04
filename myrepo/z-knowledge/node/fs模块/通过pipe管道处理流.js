const fs = require('fs');

let readStream = fs.createReadStream('./files/video.mp4');
let writeStream = fs.createWriteStream('./files/new_pipe_video.mp4');


// 通过管道处理流，就不需要自己写写入代码了，直接把读入流读出来的数据通过管道传给写入流即可
readStream.pipe(writeStream);