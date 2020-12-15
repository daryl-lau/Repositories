/* 
* 类类型接口，TypeScript能够用它来明确的强制一个类去符合某种契约
*/
interface PersonInterface {
  gender: string;
  age: number;
  eat(food: string): string;
}

class Student implements PersonInterface {
  // 和ES6不同的是，TS中属性必须声明，需要指定类型
  // 声明好属性之后，属性必须赋值一个默认值或者在构造函数中进行初始化
  gender: string
  age: number
  constructor(gender: string, age: number) {
    this.gender = gender
    this.age = age
  }
  eat(food: string) {
    console.log(food)
    return food
  }
}

let jerry = new Student('male', 18)
console.log(jerry.gender)
console.log(jerry.age)
jerry.eat('米饭')


// 继承只能单继承，即extends 后面只能继承一个父类
// 但是实现接口可以实现多个，即implements 后面可以跟多个类接口
// 例如：
interface interface1 {}
interface interface2 {}
class Cls1 implements interface1, interface2 {}

// 但如果使用抽象类，则只能继承一个
// 例如：
abstract class test1{}
abstract class test2 {}
// class Cls2 extends test1, test2{}    // 错误


// 当定义类接口中的constructor函数时，有特殊写法
// 构造函数需要单独写一个接口，定义构造函数的入参类型，以及返回类型是类的接口类型
// 例如：
interface constructorInterface {
  new (name: string): interface3 & interface4;
}
interface interface3 {
  log():string
}
interface interface4 {
  show(): string
}

const Cls3:constructorInterface = class implements interface3,interface4 {

  constructor(name:string){

  }
  log(){
    return 'loggggg'
  }
  show(){
    return 'showwww'
  }
}

