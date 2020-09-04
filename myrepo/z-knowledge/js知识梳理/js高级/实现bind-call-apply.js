
// 通过apply实现bind
Function.prototype.bind2 = function (context) {
  let self = this
  let args = Array.prototype.slice.call(arguments, 1) // 这里是bind2的参数
  return function () {
    let bindArgs = args.concat(Array.prototype.slice.call(arguments)) // 这里是返回函数的参数
    return self.apply(context, bindArgs)
  }
}

Function.prototype.call2 = function (context) {
  var context = context || window;
  context.fn = this;
  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }
  var result = eval('context.fn(' + args + ')');    // 这么写仅仅是因为call是ES3的语法，用高级的...args不合适，才用这种方式，实际上不推荐用eval语法
  delete context.fn
  return result;
}

Function.prototype.apply2 = function (context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  }
  else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')')
  }

  delete context.fn
  return result;
}



// 测试代码
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