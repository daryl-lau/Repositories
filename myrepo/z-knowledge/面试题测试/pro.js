

// let promise = new Promise(resolve => {
//   console.log(111);
//   setTimeout(resolve, 2000)

// })


// promise.then(() => { console.log(222); }).then(() => { console.log(444); })


// async function asyncF1 () { 
//   await promise
// }

// asyncF1()


function f1 () {
  return new Promise((resolve, reject) => {
    // setTimeout(() => { resolve(111111) }, 2000)
    console.log(111);
    resolve()
  })
}

async function asyncF1 () {
  let res1 = await f1()
  console.log(res1, 'res1');
}

asyncF1()