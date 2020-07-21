/*
* 访问修饰符：
* 指的就是可以在类的成员前通过添加关键字来设置当前成员的访问权限
* public:     公开的，默认，所有人都可以进行访问
* private：   私有的， 只能在当前类中进行访问
* protected： 受保护的，这能在当前类或者子类中进行访问
*/

class Cat {
  public color: string = 'white'

  // 私有属性只能在当前类中访问，实例也没有该属性
  private type: string

  // 受保护的属性只能在当前类或子类中访问
  protected size: string

  constructor(type: string, size: string) {
    this.type = type
    this.size = size
  }

  // 获取信息API，外界无法拿到的信息通过api暴露出去
  getInfo() {
    console.log(this.type, this.size, this.color)
  }
}

let mimi = new Cat('jiafei', 'big')
console.log(mimi.color)       // white
// console.log(mimi.type)     // Error，type是私有的
// console.log(mimi.size)     // Error，size是受保护的
mimi.getInfo()                // jiafei big white


class Jiafei extends Cat {
  color: string
  constructor(type: string, size: string, color: string) {
    super(type, size)
    this.color = color
  }

  getInfo() {
    super.getInfo()
    console.log(this.color)
  }
}

let xiaoJiagei = new Jiafei('xiaojiafei', 'mid', 'orange')
console.log(xiaoJiagei.color)       // orange
// console.log(xiaoJiagei.type)     // Error，type是私有的
// console.log(xiaoJiagei.size)     // Error，size是受保护的
xiaoJiagei.getInfo()                // xiaojiafei mid orange
                                    // orange

