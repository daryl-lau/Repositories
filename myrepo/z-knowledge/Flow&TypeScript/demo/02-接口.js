// 这里的{ label: string }就是一个接口，规范labelledObj必须有一个label为字符串的属性
// 编译器只会检查那些必需的属性是否存在，并且其类型是否匹配
// 类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以
function printLabell(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: "Size 10 Object" };
printLabell(myObj);
function printLabel1(labelledObj) {
    console.log(labelledObj.label);
}
var myObj1 = { size: 10, label: "Size 10 Object" };
printLabel1(myObj1);
function logXYZ(xyzObj) {
    var xyz = { x: 100, z: 100, y: 100 }; // 不关心顺序
    return xyz;
}
var xyzObj = { x: 1000, ss: 100, y: 1000, z: 10000 };
logXYZ(xyzObj);
var p1 = { x: 10, y: 20 };
// p1.x = 5; // error!
var a = [1, 2, 3, 4];
var ro = a;
// ro[0] = 12;          // error!
// ro.push(5);          // error!
// ro.length = 100;     // error!
// a = ro;              // error!   注意这里，ro是只读的，即使是重新赋值给另外一个变量，也是不允许的
a = ro; // 但是可以使用断言来重写
// 先声明一个函数，指定接口类型，再定义函数
var mySearch;
mySearch = function (source, subString) {
    var result = source.search(subString);
    return result > -1;
};
// 在定义函数的时候声明接口类型
var mySearch1 = function (source, subString) {
    var result = source.search(subString);
    return result > -1;
};
// ts的类型系统会自动检查，函数的参数会逐个进行检查，要求对应位置的参数类型是相同的，形参不用和接口里的相同，也可以不指定类型
var mySearch2 = function (src, sub) {
    var result = src.search(sub);
    return result > -1;
};
mySearch('hello world', 'hello');
mySearch1('hello world', 'hello');
mySearch2('hello world', 'hello');
var myArray;
myArray = ["Bob", "Fred"];
var myArray1;
myArray1 = { 1: 'jack', 2: 'rose' };
var myStr = myArray[0];
var Student = /** @class */ (function () {
    function Student() {
        this.gender = 'male';
        this.age = 18;
    }
    Student.prototype.eat = function (food) {
        console.log(food);
        return food;
    };
    return Student;
}());
var jerry = new Student();
console.log(jerry.gender);
console.log(jerry.age);
jerry.eat('米饭');
