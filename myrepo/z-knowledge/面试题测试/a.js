async function async1 () {
  console.log('async1 start');
  await async2();   // 遇到 await 会跳出当前函数，并让出线程，再将await后面的代码放到 微任务（microtask）队列中。
  console.log('async1 end');
}

async function async2 () {
  console.log('async2');
}

console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});

console.log('script end');