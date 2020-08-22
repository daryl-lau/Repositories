

// 不存在提升

// let c = new Class1()    // 报错
// class Class1 { }


// 类里面使用this时，
class Class2 {
  constructor(name) {
    this.name = name
  }

  print () {
    console.log(this.name);
  }
}

let c2 = new Class2('jerry')
c2.print()

let { print } = c2
// print()             // 这里报错，这里的this指向的不是c2实例了

class Class3 {
  constructor(name) {
    this.name = name
    this.print = this.print.bind(this)  // 可以在内部绑定this
  }

  print () {
    console.log(this.name);
  }
}

let c3 = new Class3('tom')
let { print: printC3 } = c3
printC3()             // 这里可以正常获取到this，因为在上面绑定了this


// 静态方法的this指向的是类，而不是实例
class Class4 { 
  static print () { 
    this.log()
  }

  static log () { 
    console.log('静态log');
  }

  log () { 
    console.log('实例log');
  }
}

Class4.log()      // 静态log，this指向的是Class4类，而不是实例，还可以看出来静态方法可以和实例方法同名