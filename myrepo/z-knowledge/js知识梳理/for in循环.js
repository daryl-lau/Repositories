
// for in 循环循环的是key，会获取到原型链上的属性和方法
// Object.keys()返回的是一个数组，对这个数组进行for in 循环，也会拿到数组的原型链上的属性和方法，这点需要注意

let arr = [1, 2, 3]
arr.__proto__.name = 'jerry'

for (let i in arr) {
  console.log(arr[i])    // 1, 2, 3, jerry
}

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])    // 1, 2, 3
};

for (let i in Object.keys(arr)) {
  console.log(arr[i])    // 1, 2, 3, jerry
}


let str = 'abcde'
str.__proto__.age = 18
for (let i in str) {
  console.log(str[i])    // a, b, c, d, e, 18
}

for (let i = 0; i < str.length; i++) {
  console.log(str[i])    // a, b, c, d, e
};

for (let i in Object.keys(str)) {
  console.log(str[i])    // a, b, c, d, e
}