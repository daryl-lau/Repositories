


let fs = require('fs');

// 创建写入流
let ws = fs.createWriteStream('./c.txt');
// console.log(ws);



// 写入内容
ws.write('温华折剑出江湖!');
ws.write('温华折剑出江湖!');
ws.write('温华折剑出江湖!');
ws.write('温华折剑出江湖!');

//关闭通道
ws.end();


// 监听建立通道
ws.once('open', ()=>{
    console.log('通道已建立!');
});

// 监听关闭通道
ws.once('close', ()=>{
    console.log('通道已关闭!');
});

