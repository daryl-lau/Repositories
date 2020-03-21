var a = 1, b = 2;


// 赋值时操作语句不要包含逻辑
c = b > 1 ? a++ : 0;    // c = 1

b > 1 ? a++ : 0;   // a = 3

console.log(c, a);