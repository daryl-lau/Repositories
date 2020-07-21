/* 
* 混合类型
*/

// 一个对象可以同时做为函数和对象使用，并带有额外的属性。
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

// 这里定义一个myCounter，要符合接口的定义，
let myCounter: Counter = <Counter>function (start: number) { }
myCounter.interval = 100
myCounter.reset = function () { }


function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c = getCounter();
console.log(c)
c(10);
c.reset();
c.interval = 5.0;
