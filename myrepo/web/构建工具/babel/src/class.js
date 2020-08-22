
class Father {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.name = { name: 'Father' }
  }

  sum () {
    return this.x + this.y
  }
}


class Son extends Father {
  constructor(a, b, c) {        // 如果要在子类里面声明自己的属性，则必须调用super

    // super关键字在constructor中就是相当于调用了父类的constructor，父类怎么传参，super就怎么传参
    // 在子类中，super调用的this指向的是子类的实例对象，因此可以在下面直接使用this.x this.y来获取
    super(a, b)
    this.c = c
    this.state = { a: 1 }
  }

  log () {
    console.log(this.state);
    console.log(this.a);
    console.log(this.b);
    console.log(this.c);
    console.log(this.name);
  }
}

let son = new Son(1, 2, 3)
son.log()



// 注意有一个很容易忽略的地方，比如下面的构造函数
class sumCalculator {
  constructor(num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
  };
  sum () {
    return this.num1 + this.num2;
  }
  cheng () {
    return this.num1 * this.num2;
  }
  log () {
    return [this.num1, this.num2];
  }
}

// 当子类调用了super()之后，在内部还是需要用this.num1来获取属性，为什么？
// 那是因为其实super(num1, num2)只是调用了父类的constructor构造函数，super把其内部的this指向了子类的实例
// 但是父类构造函数中写死了this.num1 = num1，所以子类实例只能通过this.num1来获取属性，和形参传不传相同是没有关系的
class Son2 extends sumCalculator {
  constructor(a, b, c) {
    super(a, b)
    this.c = c
  }
  log () {
    console.log(this.num1, this.num2);
  }
}
let cal5 = new Son2(1, 2, 3)
cal5.log()




// react 需要使用super(props)的原因
class Component {
  constructor(props, context) {
    this.props = props
    this.context = context
  }
}

class MyComp extends Component {
  // constructor可以不写，但是如果说想要在子组件中有自己的状态，则必须写
  constructor(...props) { 
    super(...props)
    this.state = {}
  }

  log () {
    console.log(this.props);
    console.log(this.state);
  }
}

let Comp = new MyComp('props')
Comp.log()