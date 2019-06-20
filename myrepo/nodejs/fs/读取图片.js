let fs = require('fs');

fs.readFile('./logo.png', (err, data) => {
    console.log(data);
    if(!err){
        fs.writeFile('./new.jpg', data, (err)=>{
            if(!err){
                console.log('写入成功!')
            }else {
                throw err;
            }
        })
    }else {
        throw err;
    }
});