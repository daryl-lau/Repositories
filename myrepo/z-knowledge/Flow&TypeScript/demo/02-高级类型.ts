//* 交叉类型，交叉类型是将多个类型合并为一个类型

// fn的作用是把两个类实例的属性进行合并
function fn<T, U>(first: T, last: U): T & U {
  let result = <T & U>{}
  for (let prop in first) {
    (<any>result)[prop] = (<any>first)[prop];
  }
  for (let prop in last) {
    if (!result.hasOwnProperty(prop)) {
      (<any>result)[prop] = (<any>last)[prop];
    }
  }
  return result
}


class Person {
  constructor(public name: string) { }
}

interface Loggable {
  log(): void;
}
class ConsoleLogger implements Loggable {
  log() {
    console.log('loooooooooog~')
  }
}

let res = fn(new Person('jerry'), new ConsoleLogger())
console.log(res);



//* 联合类型
let value: string | number | boolean;
value = 'string'
value = 100
value = true
// value = new Date()    // ERROR

// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function getSmallPet(): Fish | Bird {
  // ...
  return
}

let pet = getSmallPet();
pet.layEggs(); // okay
// pet.swim();    // errors，因为不能确定返回类型是否包含swim方法

// 由于我们不确定返回的倒是是Fish还是Bird，因此我们使用以下方式来判断
// 但是我们不确定是否pet具有swim或者fly方法，因此下面的代码ts会报错
// if (pet.swim) {
//   pet.swim();
// }
// else if (pet.fly) {
//   pet.fly();
// }

// 通过断言来使上述代码能正常编译
if ((<Fish>pet).swim) {
  (<Fish>pet).swim();
}
else {
  (<Bird>pet).fly();
}

//* 类型别名，就是给类型取一个别名，类型可以是有其他类型组成的
type Name = string;     // 声明Name是一个string类型，下面就可以使用Name来代替string类型了
type NameResolver = () => string; // 声明NameResolver是一个返回string类型的函数
type NameOrResolver = Name | NameResolver;  // 声明NameOrResolver是一个Name类型或者NameResolver类型
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  }
  else {
    return n();
  }
}

// 还可以是泛型
type Container<T> = { value: T };

// 类型别名和接口的作用很相似，但是类型别名不能被extends和implements
type Alias = { num: number }
interface Interface {
  num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
getName('123')
getName(() => '123')



//* 字面量类型
type Easing = "ease-in" | "ease-out" | "ease-in-out"  // 只能使用定义里的三种值
type Num = 1 | 2 | 3    // 只能使用1或2或3

let easing: Easing
easing = 'ease-in'
// easing = 'ease-other'  Error

let num1: Num
num1 = 1
// num1 = 111   Error


/* 
* 映射类型
*/
// 假设我想把接口Person里的所有属性都设置为只读的或者可选的类型，我们需要重新定义接口吗？
// 其实不用，我们可以使用映射类型，来基于已有的接口，映射出其他的类型
interface Person {
  name: string
  age: number
}
// 这里 in keyof 可以理解为for循环，把每个泛型属性拿出来，添加上只读修饰符
type personReadonly<T> = {
  readonly [P in keyof T]: T[P];
}
type personPartial<T> = {
  [P in keyof T]?: T[P];
}
// 使用上面定义的映射，重新声明一个类型
type PersonPartial = personPartial<Person>;
type ReadonlyPerson = personReadonly<Person>;

// 通过以上方式映射后，就相当于一下形式了
// interface PersonReadonly {
//   readonly name: string;
//   readonly age: number;
// }
// interface PersonPartial {
//   name?: string;
//   age?: number;
// }

// 一个更简单的例子
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
// 这里Flags 和 Flags1是等效的
type Flags1 = {
  option1: boolean;
  option2: boolean;
}
