/* 
* 类类型接口，TypeScript能够用它来明确的强制一个类去符合某种契约
*/
interface PersonInterface {
  gender: string
  age: number
  eat(food: string): string
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
