

// 这里的{ label: string }就是一个接口，规范labelledObj必须有一个label为字符串的属性
// 编译器只会检查那些必需的属性是否存在，并且其类型是否匹配
// 类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以
function printLabell(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabell(myObj);


// 接口可以单独声明出来，注意接口分隔符写 , 和 ; 都可以，推荐分号，和对象区分
interface LabelledValue {
  label: string;
}

function printLabel1(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj1 = { size: 10, label: "Size 10 Object" };
printLabel1(myObj1);



/* 
* 可选属性
*/
interface xyz {
  x?: number;
  y?: number;
  z?: number;
}

function logXYZ(xyzObj: xyz): { x: number; y: number; z: number } {
  let xyz = { x: 100, z: 100, y: 100 }  // 不关心顺序
  return xyz
}

let xyzObj = { x: 1000, ss: 100, y: 1000, z: 10000 }
logXYZ(xyzObj)



/* 
* 只读属性
*/
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // error!

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12;          // error!
// ro.push(5);          // error!
// ro.length = 100;     // error!
// a = ro;              // error!   注意这里，ro是只读的，即使是重新赋值给另外一个变量，也是不允许的
a = <Array<number>>ro   // 但是可以使用断言来重写


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


/* 
* 可索引类型
*/
// 定义索引key为number类型，索引值为string类型
// 这个索引签名表示了当用 number去索引StringArray时会得到string类型的返回值。
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myArray1: StringArray
myArray1 = { 1: 'jack', 2: 'rose' }

let myStr: string = myArray[0];


/* 
* 类类型接口，TypeScript能够用它来明确的强制一个类去符合某种契约
*/
interface PersonInterface {
  gender: string;
  age: number;
  eat(food: string): string
}

class Student implements PersonInterface {
  gender: string
  age: number
  constructor() {
    this.gender = 'male'
    this.age = 18
  }
  eat(food: string) {
    console.log(food)
    return food
  }
}

let jerry = new Student()
console.log(jerry.gender)
console.log(jerry.age)
jerry.eat('米饭')
