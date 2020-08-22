const { reduce } = require("underscore");

// 实现一个函数
// add(1)(2)      // 3
// add(1, 2)(3)   // 6
// add(1)(2, 3)   // 6

function sum (...args1) {
  let fn = function (...args2) {
    return sum(...args1, ...args2)
  }

  fn.valueOf = function () {
    return args1.reduce((a, b) => a + b)
  }

  return fn
}

console.log(sum(1)(2)(3)(4, 5) + 0);




// 将下面函数柯里化
function add (x, y, z) {
  return x + y + z
}

function curry (fn, ...args1) {
  if (args1.length >= fn.length) {
    return fn(...args1)
  }

  return function (...args2) {
    return curry(fn, ...args1, ...args2)
  }
}

let f = curry(add)
console.log(f(1)(2)(3));
console.log(f(1, 2)(3));
console.log(f(1)(2, 3));