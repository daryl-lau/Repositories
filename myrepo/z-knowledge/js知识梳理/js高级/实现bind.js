
// 通过apply实现bind
Function.prototype.bind2 = function (context) {
  let self = this
  let args = Array.prototype.slice.call(arguments, 1) // 这里是bind2的参数
  return function () {
    let bindArgs = args.concat(Array.prototype.slice.call(arguments)) // 这里是返回函数的参数
    return self.apply(context, bindArgs)
  }
}

let obj = {
  a: 1
}

function fn (arg1, arg2, arg3) {
  console.log(this.a);
  console.log(arg1);
  console.log(arg2);
  console.log(arg3);
  return arg3
}

// f = fn.bind(obj, 'some args')
// f()

f2 = fn.bind2(obj, 'some args', 'some args1')
f2('some args3')
console.log(f2('some args3'));