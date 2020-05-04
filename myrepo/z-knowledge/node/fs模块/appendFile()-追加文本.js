const fs = require('fs');


// 向文件末尾添加文本，\n换行符
fs.appendFile('./files/appendFile.txt', '\n雪中悍刀行', (err) => {
    if (!err
    ) {
        console.log('写入成功');
    } else {
        throw err;
    }
})