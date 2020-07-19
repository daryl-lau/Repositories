
class Person {

  prop = '实例属性'
  static classProp = '类属性'

  // 没有用static关键字声明的方法是实例方法，实例方法只能由实例调用
  // 在实例方法中，this指向的是实例，而不是类
  method () {
    console.log('实例方法');
    console.log(this.prop);         // 实例属性
    console.log(this.classProp);    // undefined
    return '实例方法'
  }

  // 用static关键字声明了的方法就是静态方法，静态方法只能由类调用
  // 在静态方法中this指向的是类，而不是实例
  static classmethod () {
    console.log('静态方法');
    console.log(this.prop);         // undefined
    console.log(this.classProp);    // 类属性
    return '静态方法'
  }
}

let ming = new Person()

ming.method()         // 实例方法
// ming.classmethod()    // ERROR ming.classmethod is not a function


// Person.method()       // ERROE Person.method is not a function
Person.classmethod()    // 静态方法



class Man extends Person {

}

let jerry = new Man()

// 这里的实例方法继承自Person，还是同样的，实例方法只能被实例调用，静态方法只能被类调用
jerry.method()          // 实例方法

// 这里的静态方法是继承自Person的
Man.classmethod()         // 静态方法


class Women extends Person {

  method () {
    console.log(super.method() + '，复写父类实例方法');
  }

  // 可以直接在子类中使用super访问父类的方法
  static classmethod () {
    console.log(super.classmethod() + '，复写父类静态方法');
  }
}

let jing = new Women()

jing.method()
Women.classmethod()