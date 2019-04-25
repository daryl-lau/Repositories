const fs = require('fs');

fs.readFile(__dirname + '/data/a.txt', (err, data)=>{
    if(err){
        throw err;
    }else {
        console.log(data.toString());
    }
});