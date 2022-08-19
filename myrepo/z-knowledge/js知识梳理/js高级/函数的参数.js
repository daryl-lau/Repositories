function trueCurrying(fn, ...args) {
  if (args.length > fn.length) {
    throw new Error("参数错误!超出参数限制!");
  }
  if (args.length === fn.length) {
    return fn(...args);
  }
  return function (...args2) {
    console.log(args2)
    return trueCurrying(fn, ...args, ...args2);
  };
}

function add(x, y, z) {
  return x + y + z;
}

let f = trueCurrying(add);
// console.log(f(1, 2)(3));
console.log(f(1)(2)(3));
// console.log(f(1)(2, 3));

let f1 = f(10, 20);

