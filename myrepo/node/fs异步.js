

let fs = require('fs');

fs.open('./a.txt', 'w', (err, fd)=>{
    if(!err){
        fs.writeFile(fd, '天不生我李淳罡，剑道万古长如夜', (err)=>{
            if(!err){
                console.log('写入文件成功！')
            }else {
                throw err;
            }
        });

        fs.close(fd, (err)=>{
            if(!err){
                console.log('文件已保存并关闭')
            }else {
                throw err;
            }
        })
    } else {
        throw err;
    }
});