
// module.exports 和 exports 实际上是module对象的同一个exports属性，可以直接通过module.exports 和 exports访问，两者是同一个东西
console.log(module);
console.log(module.exports);
console.log(exports);

// 从打印我们可以看出，module.exports和exports一开始都是一个空对象{}，都是module对象的exports属性，这两个对象指向同一块内存。
// 这也就是说module.exports和exports是等价的（有个前提：不去改变它们指向的内存地址）。
console.log(module.exports === exports);    // true

// require实际上是把引入的文件执行了一遍，文件该怎么执行就怎么执行，然后拿到module.exports导出出来的结果作为接受；
// 使用 module.exports 和 exports 导出数据在外面通过require()接收，这里require()接收到的数据就是 module.exports 属性的值；
// module.exports这个属性不仅仅可以是对象，只是将其初始化为了对象，其还可以是常量，函数，类等，导入的也会是对应的数据类型
// module.exports = {age: 18}, // 外面导入 const obj = require('PATH'); 此时 obj == {age:18};
// module.exports = 'jerry';   // 外面导入 const obj = require('PATH'); 此时 obj == 'jerry';
// module.exports = function () { ... }; // 外面导入 const obj = require('PATH'); 此时 obj == function () { ... };
// module.exports = class { ... }; // 外面导入 const obj = require('PATH'); 此时 obj == class { ... };


// !!!!!! 这里需要特别注意的是，直接使用exports无法导出整个对象，require()接收到的值始终是{}；
// 使用 exports 只能使用.语法进行导出，导出的也只能是对象，
// exports = 'jerry' // 外面导入 const obj = require('PATH'); 此时 obj == {};
// exports = function () { } // 外面导入 const obj = require('PATH'); 此时 obj == {};
// exports = { age: 18 }; // 外面导入 const obj = require('PATH'); 此时 obj == {};
// exports.name = 'jerry';  // 外面导入 const obj = require('PATH'); 此时 obj == {name: 'jerry'};
// exports.func = function () { }; // 外面导入 const obj = require('PATH'); 此时 obj == {func: function(){}};


// module.exports 也可以直接使用.语法进行赋值，有多个就直接添加属性，导出时会导出一整个对象；
// module.exports.name = 'jerry'; // 外面导入 const obj = require('PATH'); 此时 obj == { name: 'jerry' };


// module.exports 和 exports 可以混用，都是操作的module.exports这个属性而已，和普通的对象操作一样；注意也会有覆盖的情况；
// 只是需要特别注意不能直接使用exports = {} 的形式进行导出
