

let n = 10;
n++; // 相当于 n = n + 1
console.log(n); // 11

let m = 10;
m--; // 相当于 m = m - 1
console.log(m); // 9


// ++在后，是先进行计算赋值，再进行自增1，--同理
let x = 10;
x = x++ + 10;
console.log(x); // 20

// ++在前，是先进行自增1，再进行计算赋值，--同理
let y = 10;
y = ++y + 10;
console.log(y); // 21