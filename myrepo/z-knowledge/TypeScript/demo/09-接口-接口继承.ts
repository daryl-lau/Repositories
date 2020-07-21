/* 
* 接口继承
*/
interface AnimalInterface {
  color: string
  age: number
  [propsName: string]: any
}

interface DogInterface extends AnimalInterface {
  jiao(): void
}

class Dog implements DogInterface {
  color: string
  age: number
  name: string
  constructor(name: string, color: string, age: number) {
    this.color = color
    this.age = age
    this.name = name
  }

  jiao() {
    console.log('wangwang~')
  }
}

let daHuang = new Dog('大黄', 'red', 3)
daHuang.jiao()

// 多重继承
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

// 先断言再赋值，如果使用了断言，则属性只能设置为接口中定义了的属性，除非添加了额外属性
// 断言后不用一次性赋值所有属性，可以只赋值其中的几个，只要是在接口中定义了的就行
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
// square.someOtherProp = 'someOtherProp';    // Error


// 但如果直接在断言的对象中赋值，则可以赋额外的属性
let square1 = <Square>{
  color: "blue",
  sideLength: 10,
  penWidth: 5.0,
  someOtherProp: 'someOtherProp'
}

// 如果直接赋值，则一次性必须赋值所有，不能少也不能多
let mySquare: Square = {
  color: "blue",
  sideLength: 10,
  penWidth: 5.0,
}