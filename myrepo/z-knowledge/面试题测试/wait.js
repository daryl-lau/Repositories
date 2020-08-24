

// let promise = new Promise(resolve => {
//   console.log('aaa')
//   setTimeout(() => { }, 5000)
// })



// function timeOut (text) {
//   return new Promise(resolve => {
//     console.log(text);
//     setTimeout(resolve, 3000)
//   })
// }

// async function asyncTimeout () {
//   await timeOut('timeout')
// }

// asyncTimeout()


let queue = []


function a () {
  return new Promise(resolve => {
    console.log('aaaaa');
    setTimeout(resolve, 2000)
  })
}

function b () {
  return new Promise(resolve => {
    console.log('bbbbb');
    setTimeout(resolve, 2000)
  })
}

queue.push(a)
queue.push(b)

async function exec () {
  // for (let i = 0; i < queue.length; i++) {
  //   let fn = queue[i]
  //   await fn()
  // };
  while (queue.length) {
    fn = queue.shift()
    await fn()
  }
}

exec()




// function timeout (ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// async function asyncPrint (value, ms) {
//   await timeout(ms);
//   console.log(value);
// }

// asyncPrint('hello world', 2000);

