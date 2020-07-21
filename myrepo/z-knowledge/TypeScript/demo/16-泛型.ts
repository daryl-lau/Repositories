/* 
* 当我们的参数是一个不确定的数据类型的时候，且返回值和传入的参数是同一种数据类型，我们就可以使用泛型
* 我们也可以使用any，但是any不能确保输入和输出是同一种数据类型，会丢失一些信息
*/
// 函数identity有一个泛型，参数类型，以及返回值，都是T，T就表示泛型的类型变量
function identity<T>(arg: T): T {
  return arg;
}

// 使用的时候，指定具体的泛型变量类型，即可保证输出也是string类型
let output = identity<string>('hello')
console.log(output)

// 我们不需要手动指定泛型的变量类型，ts会帮我们自动检测传过去的是什么类型
let output1 = identity('world')
console.log(output1);



/* 
* 使用泛型变量，下面的代码会报错，因为arg指定类型是T，但是T是泛型，不确定传进来的是很么类型，如果是数字就没有length属性，因此会报错
*/
// function getLength<T>(arg: T): T {
//   console.log(arg.length);
//   return arg
// }

// 使用<T>指定了泛型，传入的参数规定为泛型组成的数组，返回值也是一样，就可以使用了
function getLength1<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg
}

function getLength2<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);
  return arg
}

// 箭头函数形式，可以使用不同的泛型参数名，只要前后对应就可以了
const getLength3 = <U>(arg: Array<U>): Array<U> => { return arg }

let len = getLength3([1, '2', true])
console.log(len);


/* 
* 在泛型里使用类类型
*/
// 以下代码函数create接收一个名为C的类，返回C的实例，如果不是传入的类，代码将会报错
// function create(C) { 
//   return new C()
// }

// 使用泛型队该函数进行约束，参数c后面{new ()} 表示c是一个类，可以new，再加上一个传入类型和返回类型，就可以这么写
function createC<T>(c: { new(): T }): T {
  return new c();
}
