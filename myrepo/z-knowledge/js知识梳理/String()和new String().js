s1 = 'string'
s2 = String('string')
s3 = new String('string')

// 直接赋值字符串和String 创建的是一个基本类型
// new String() 返回的是一个对象
// 只是类型不同，字符串的特性以及方法不管什么方式创建都是一样的
// 性能方面，直接赋值的方式开销更低

console.log(typeof s1)  // string
console.log(typeof s2)  // string
console.log(typeof s3)  // object

console.log(s1 === s2); // true
console.log(s1 === s3); // false
console.log(s2 === s3); // false

console.log(s1 == s2);  // true
console.log(s1 == s3);  // true
console.log(s2 == s3);  // true
