const { fromJS } = require('immutable')

let obj = {
  a: 1,
  b: 2
}

// immutableObj 有一个自己的对象，只有用这个对象才能用他提供的一些api，
// 通过 fromJs 将一个普通对象转化为 immutable 对象
// 然后通过immutableObj.toJS 再转为 js 对象
let immutableObj = fromJS(obj)

console.log(obj === immutableObj);

console.log(immutableObj.get('a'));

console.log(immutableObj.toJS())


