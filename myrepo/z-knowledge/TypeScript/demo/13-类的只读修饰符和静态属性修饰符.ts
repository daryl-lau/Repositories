/**
 * 类中的readonly修饰符定义实例属性是只读的，无法被实例修改
 * readonly的属性可以在声明属性的时候就给定一个初始值，或者在constructor构造器中进行初始化
 */

class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(theName: string) {
    this.name = theName;
  }
}
let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.


/**
 * static 修饰符定义属性或方法是一个类属性或者类方法，没有用static定义的都是实例属性或实例方法
 * 类属性或类方法可以直接在构造函数上进行调用，例如Math.ceil，Math.floor，Array.from 等 
 * 同样的，static静态属性可以在声明属性的时候就给定一个初始值，或者在constructor构造器中进行初始化
 * 
 * 不论是静态属性还是静态方法，都能被继承，同样，被继承后静态属性或静态方法还是只能被构造函数访问，不能被实例访问
 */

class Man {
  static manName: string;
  static manAge: number = 18;
  constructor(manName: string){
    Man.manName = manName
  }
}

let tom1 = new Man('tom');
// console.log(tom1.manName)     // error
console.log(Man.manName)      // tom

// console.log(tom1.manAge)      // error
console.log(Man.manAge)       // 18


/**
 * 需要注意的是 
 */