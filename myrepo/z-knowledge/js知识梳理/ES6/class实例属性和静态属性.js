
class Person {
  constructor() {
    this.oldProp = '实例属性老写法'
  }

  // 实例属性，这是新写法，以前的老写法需要在constructor中定义
  prop = '实例属性'

  // 静态属性
  static classProp = '静态属性'
}

let ming = new Person()

console.log(ming.oldProp);           // 实例属性老写法
console.log(ming.prop);           // 实例属性
console.log(ming.classProp);      // undefined

console.log(Person.oldProp);         // undefined
console.log(Person.prop);         // undefined
console.log(Person.classProp);    // 静态属性


class Man extends Person {
}

let man = new Man()

// 继承过来的实例属性只能被实例访问，继承过来的静态属性只能被类访问
console.log(man.oldProp);           // 实例属性老写法
console.log(man.prop);           // 实例属性
console.log(man.classProp);      // undefined

console.log(Man.oldProp);         // undefined
console.log(Man.prop);          // undefined
console.log(Man.classProp);      // 静态属性