



// 1、buffer申请内存四中方法

// Buffer.from();
// Buffer.alloc();
// Buffer.allocUnsafe();
// Buffer.allocUnsafeSlow();

let str = 'www.ywzone.com';
let buffer = Buffer.from(str);

console.log(buffer);

console.log(buffer.length);

console.log(buffer.toString());





let buffer2 = Buffer.alloc(20);
console.log(buffer2);
buffer2[0] = 63;    // 二进制会转换为16进制存储
buffer2[1] = 0x6f;
buffer2[2] = 0x77;

console.log(buffer2);

console.log(buffer2.toString());

