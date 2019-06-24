const http = require('http');
const socket = require('socket.io');

// ws安全，快，自动数据解析

// 建立普通的http服务，ws在建立连接的时候一开始是使用的http协议
let server = http.createServer(() => {
});
server.listen(8080);

// 建立ws服务， 监听的不是端口号，而是http服务
let ws = socket.listen(server);

// 当ws建立连接的时候，会接受一个sock对象，在sock对象中有两个方法，emit和on， emit负责发送数据，on负责接收数据
ws.on('connection', sock => {
    // 发送数据  sock.emit('name', data)， 发送的数据保持其原有的数据类型，不会发生改变，客户端发送过来的也是一样
    // 发送和接收的名字需要客户端与服务端保持一致，否则无法接收
    // sock.emit();
    setInterval(function () {
        sock.emit('time', new Date().getTime());
    }, 1000);

    // 接收数据，sock.on('name', (data)=>{})
    // sock.on();
    sock.on('data1', (a, b, c) => {
        console.log(a, b, c, a + b + c);
    })
});