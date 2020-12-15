/**
 * 类中的readonly修饰符定义实例属性是只读的，无法被实例修改
 * readonly的属性可以在声明属性的时候就给定一个初始值，或者在constructor构造器中进行初始化
 */
var Octopus = /** @class */ (function () {
    function Octopus(theName) {
        this.numberOfLegs = 8;
        this.name = theName;
    }
    return Octopus;
}());
var dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
/**
 * static 修饰符定义属性或方法是一个类属性或者类方法，没有用static定义的都是实例属性或实例方法
 * 类属性或类方法可以直接在构造函数上进行调用，例如Math.ceil，Math.floor，Array.from 等
 */
var Man = /** @class */ (function () {
    function Man(manName) {
        Man.manName = manName;
    }
    Man.manAge = 18;
    return Man;
}());
var tom1 = new Man('tom');
// console.log(tom1.manName)  // error
console.log(Man.manName);
// console.log(tom1.manAge)  // error
console.log(Man.manAge);
