
/* 
* 布尔值
*/
let isDone: boolean = false;


/* 
* 数字
*/
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;


/* 
* 字符串
*/
let username: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${username}`


/* 
* 数组
*/
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];


/*
* 元组，ts新增，元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
*/
let tuple: [string, number] = ['abc', 10]
// let tuple: [string, number] = [100, 10]  // 错的


/* 
* 枚举，ts新增，enum类型是对JavaScript标准数据类型的一个补充
*/
enum Gender { male = 0, female = 1, unknow = -1 }
let g: number = Gender.male
console.log(g)  // 0


/* 
* 任何类型
*/
let notSure: any = 4;   // noSure可以是任意js对象
let list3: any[] = [1, true, "free"];  // 由任意对象组成的数组
let list4: Array<any> = [1, true, "free"];  // 由任意对象组成的数组


/* 
* void，没有任何类型，当函数没有返回值时，可以设置为void
*/
function warnUser(): void {
  console.log("This is my warning message");
}


/* 
* never
*/
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}


/* 
* object
*/
// 函数声明，不是函数，只是声明
declare function create(obj: object | null): void;

// function create1(o: number): number {
//   console.log(o)
//   return 1
// }

create({ prop: 0 });    // OK
create(null);           // OK
// create(42);          // Error
// create("string");    // Error
// create(false);       // Error
// create(undefined);   // Error


/* 
* 类型断言，类型断言需要使用()包起来
* 能确定变量类型的话，就可以使用断言
*/
// “尖括号”语法
let someValue: any = 'some message';
let strLength: number = (<string>someValue).length;

// 另一个为as语法，在TypeScript里使用JSX时，只有 as 语法断言是被允许的
let someValue1: any = "this is a string";
let strLength2: number = (someValue as string).length;








