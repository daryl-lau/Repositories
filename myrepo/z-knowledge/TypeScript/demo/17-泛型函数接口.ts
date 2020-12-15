/* 
* 泛型函数接口
*/
//* 方式一，泛型定义在函数中，这种写法的特点是用户调用的时候，可以给定任意数据类型
interface ConfigFn {
  <T>(value: T): T;
}

function getData<T>(value: T): T {
  console.log(value);
  return value
}

const myGetData: ConfigFn = getData
// 函数实现
myGetData<string>('baihuzi.com')
myGetData<number>(10086)


//* 方式二，泛型定义在接口中，推荐这种写法，这种方式提前指定泛型的数据类型
//* 这样接口里的其它成员也能知道这个参数的类型
interface ConfigFn1<T> {
  (value1: T): T;  // 泛型接口
}

// 函数实现，箭头函数写法
// 提前执行函数需要的数据类型，这里使用的时候只能传字符串类型的数据
const myGetData1: ConfigFn1<string> = value1 => {
  console.log(value1);
  return value1
}
myGetData1('www.baihuzi.com')
// myGetData1(123)   // error
