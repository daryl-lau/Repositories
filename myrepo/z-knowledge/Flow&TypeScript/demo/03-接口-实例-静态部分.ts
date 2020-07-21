/* 
* 下面这个接口定义是错误的，因为类接口只能作用域实例部分，对静态属性和静态方法不管用
* 构造函数constructor也属于静态部分
*/

// 这里声明的接口只能作用于实例部分，无法作用于静态部分
interface CarInterface {
  run(): void
  size: number
}

class Car implements CarInterface {
  // CarInterface接口只对实例部分生效，如果实例部分没有定义相应的属性或方法，ts则会报错
  // 下面的代码注释将会报错
  size = 1000
  run() {
    console.log('跑')
  }

  // 上面接口定义的规则只对实例属性和实例方法有效，对静态属性和静态方法都无效
  // 如果没有实例属性和实例方法，只有静态的，则ts校验报错
  static size = 1000
  static run() {
    console.log('跑')
  }
}



/* 
* 改造很简单，再声明一个类类型的接口，里面包含了构造函数、静态实例、静态方法
* 再将构造函数的返回值指向实例部分的接口就可以了，此时如果类里面没有实现这些属性或方法ts就会报错
*/
// 这里面都是实例部分的属性和方法
interface CarInterface1 {
  piaoyi(): void
  name: string
}

// 声明一个类接口，声明静态方法，其中包含构造函数，静态属性以及静态方法
// 其中构造函数的返回值指向实例部分的类接口
interface CarStatic {
  new(name: string): CarInterface1
  size: number
  run(a: string): void
}

function createCar(creator: CarStatic, name: string): CarInterface1 {
  return new creator(name)
}

class Car1 implements CarInterface1 {
  name: string
  constructor(name: string) {
    this.name = name
  }

  piaoyi() {
    console.log('漂移~~~')
  }

  static size = 1000
  static run() {
    console.log('跑')
  }
}

let bmw = createCar(Car1, '宝马')
console.log(bmw)
console.log(bmw.name)
