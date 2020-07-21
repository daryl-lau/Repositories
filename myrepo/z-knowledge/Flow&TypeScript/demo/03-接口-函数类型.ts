/* 
* 函数类型
*/
// 声明函数有两个参数，source和subString，都是字符串类型，返回值是布尔类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}

// 先声明一个函数，指定接口类型，再定义函数
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}

// 在定义函数的时候声明接口类型
let mySearch1: SearchFunc = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}

// ts的类型系统会自动检查，函数的参数会逐个进行检查，要求对应位置的参数类型是相同的，形参不用和接口里的相同，也可以不指定类型
let mySearch2: SearchFunc = function (src, sub) {
  let result = src.search(sub);
  return result > -1;
}

mySearch('hello world', 'hello')
mySearch1('hello world', 'hello')
mySearch2('hello world', 'hello')