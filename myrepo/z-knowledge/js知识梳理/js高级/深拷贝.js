
// 深拷贝
function deepCopy (originObj) {
  let targetObj = new originObj.__proto__.constructor
  for (let key in originObj) {
    let value = originObj[key]
    // if (Object.prototype.toString.call(value) !== '[object Object]' &&  Object.prototype.toString.call(value) !== '[object Array]' && Object.prototype.toString.call(value) !== '[object Function]') {
    if (!(value instanceof Object)) {
      targetObj[key] = value
    } else {
      targetObj[key] = deepCopy(value)
    }
  }
  return targetObj
}


// 测试
let func = function () { console.log('function'); }
let arr = [1, 2, 3, { a: 10 }, func]
let arr2 = deepCopy(arr)
arr[3].a = 100
console.log(arr, arr2);
func.valueOf = function () { return 'new function' }
console.log(arr[4].valueOf());
console.log(arr2[4].valueOf());


let obj = { a: [1, 2, 3], b: 'string', c: { test: { test1: { test2: 'test2' } } }, d: function () { console.log('test'); } }
let obj2 = deepCopy(obj)
console.log(obj2);
obj.a[0] = 1000
obj.c.test.test1 = null
obj.d = function () { console.log('changed'); }
console.log(obj, obj2);
obj.d()
obj2.d()