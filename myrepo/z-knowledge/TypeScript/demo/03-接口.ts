/* 
* 这里的{ label: string }就是一个接口，规范labelledObj必须有一个label为字符串的属性
* 编译器只会检查那些必需的属性是否存在，并且其类型是否匹配
* 类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以
*/
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
