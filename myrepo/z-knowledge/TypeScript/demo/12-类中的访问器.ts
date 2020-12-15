/**
 * 在类中，我们不能将所有的属性都设置为public的，这样做非常不安全，我们需要定义为private私有属性
 * 但是此时，私有属性只能由类自身访问和设置，在其子类或者实例中是无法访问或修改的
 * 此时我们就可以定义访问器，控制私有属性的访问和设置，如下例子所示
 */

 type gender = 'male' | 'female';

 class Person1 {
     name: string;
     age: number;
     private _gender: gender;    // 性别保密
     constructor(name: string, age: number, _gender: gender){
         this.name = name;
         this.age = age;
         this._gender = _gender;
     }

    // 下面两个的函数名必须相同，并且在外部访问或设置属性的时候，不是用的类里面定义的 _gender 属性名，而是使用这里的函数名
    // ts会将这两个函数编译到Object.defineProperty里去，而函数名则作为Object.defineProperty的第二个参数
    // public 可以省略，且get函数可以设置函数的返回值类型，但set函数不能设置函数返回值类型，在另一个例子中有体现
     public get gender(){
         return this._gender
     }

     public set gender(g: gender){
         this._gender = g
     }
 }

 let jerry1 = new Person1('jerry', 180, 'male')

 console.log(jerry1.gender)

 jerry1.gender = 'female'

 console.log(jerry1.gender)

 /**
  * 报错：
  * error TS1056: Accessors are only available when targeting ECMAScript 5 and higher.
  * 注意在编译的时候，需要编译成为ECMAScript5（即ES6）的代码，因为ts本身是不具备做到get 和 set的能力的
  * 需要借助js中的Object.defineProperty方法来完成，因此最低只能编译到ES6，否则没有Object.defineProperty方法
  * tips: ts默认编译到ES4
  * 命令：tsc --target ES5 xxx.ts   (这里的ES5即ECMAScript5)
  */


// 另一个例子
class People {
    // name: string = ""
    private _name: string = ""
    // 属性的存取器
    get name(): string {
      return this._name;
    }
  
    set name(value: string) {
      // 设置器中可以添加相关的校验逻辑
      if (value.length < 2 || value.length > 5) {
        throw new Error("名字不合法，不许使用！")
      }
      this._name = value;
    }
  }
  
  var p = new People(); 
  p.name = "hello"
  
  console.log(p.name);

