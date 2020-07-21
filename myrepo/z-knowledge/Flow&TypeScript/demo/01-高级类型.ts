//* 交叉类型，交叉类型是将多个类型合并为一个类型

function fn<T, U>(first: T, last: U): T & U {
  let result = <T & U>{}

  console.log(first);
  console.log(last);

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

