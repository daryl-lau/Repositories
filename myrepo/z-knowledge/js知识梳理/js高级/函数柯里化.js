
// 普通加法函数
function addFn (x, y) {
  return x + y
}

// 高阶函数，返回另外一个函数，变量x闭包
function curryAdd (x) {
  return function (y) {
    return x + y
  }
}

console.log(curryAdd(2)(2));
let addTen = curryAdd(10)
console.log(addTen(2));

// 抽象上面的高阶函数，先假设只有两个参数，则内部只用返回一个函数
function curry (fn, ...args1) {
  return function (...args2) {
    return fn(...args1, ...args2)
  }
}


// 假设有三个参数，不能写死，需要递归生成
function add (x, y, z) {
  return x + y + z
}

function trueCurrying (fn, ...args) {
  console.log(args, 'args')
  if (args.length > fn.length) {
    throw new Error('参数错误!超出参数限制!')
  }
  if (args.length === fn.length) {
    return fn(...args)
  }
  return function (...args2) {
    return trueCurrying(fn, ...args, ...args2)
  }
}

let f = trueCurrying(add)
console.log(f(1, 2)(3));
console.log(f(1)(2)(3));
console.log(f(1)(2, 3));

let f1 = f(10, 20)
console.log(f1(30));



function aaa (...args1) {
  return function (...args2) {
    return function (...args3) {
      return [...args1, ...args2, ...args3].reduce((a, b) => a + b)
    }
  }
}
console.log(aaa(1, 2)(3, 30)(1, 30));



function sum (...args1) {
  let fn = function (...args2) {
    return sum(...args1, ...args2)
  }

  fn.valueOf = function () {
    return args1.reduce((total, curr) => total + curr)
  }
  return fn
}

let res1 = sum(1)(2)(3)                // 6
let res2 = sum(1, 2, 3)(4)             // 10
let res3 = sum(1)(2)(3)(4)(5)          // 15
let res4 = sum(2, 6)(1)                // 9

console.log(res1 + '');



// valueOf() 方法返回指定对象的原始值。
function test () { }
test === test.valueOf()   // true

test.valueOf = function () { console.log('test'); }

