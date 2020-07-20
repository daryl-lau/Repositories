/*
* 布尔值
*/
var isDone = false;
/*
* 数字
*/
var decLiteral = 6;
var hexLiteral = 0xf00d;
var binaryLiteral = 10;
var octalLiteral = 484;
/*
* 字符串
*/
var username = "Gene";
var age = 37;
var sentence = "Hello, my name is " + username;
/*
* 数组
*/
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
/*
* 元组，ts新增，元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
*/
var tuple = ['abc', 10];
// let tuple: [string, number] = [100, 10]  // 错的
/*
* 枚举，ts新增，enum类型是对JavaScript标准数据类型的一个补充
*/
var Gender;
(function (Gender) {
    Gender[Gender["male"] = 0] = "male";
    Gender[Gender["female"] = 1] = "female";
    Gender[Gender["unknow"] = -1] = "unknow";
})(Gender || (Gender = {}));
var g = Gender.male;
console.log(g); // 0
/*
* 任何类型
*/
var notSure = 4; // noSure可以是任意js对象
var list3 = [1, true, "free"]; // 由任意对象组成的数组
var list4 = [1, true, "free"]; // 由任意对象组成的数组
/*
* void，没有任何类型，当函数没有返回值时，可以设置为void
*/
function warnUser() {
    console.log("This is my warning message");
}
/*
* never
*/
// 返回never的函数必须存在无法达到的终点
function error(message) {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop() {
    while (true) {
    }
}
create({ prop: 0 }); // OK
create(null); // OK
// create(42); // Error
// create("string"); // Error
// create(false); // Error
// create(undefined); // Error
/*
* 类型断言，类型断言需要使用()包起来
* 能确定变量类型的话，就可以使用断言
*/
// “尖括号”语法
var someValue = 'some message';
var strLength = someValue.length;
// 另一个为as语法，在TypeScript里使用JSX时，只有 as 语法断言是被允许的
var someValue1 = "this is a string";
var strLength2 = someValue.length;
