async function a () {
  const res = await  b()
  console.log(res);
}

async function b () {
  console.log('b');
  return 'res'
}

a()

new Promise((resolve, reject) => {
  console.log('promise');
  resolve()
}).then(() => { 
 console.log('then');
})

console.log('main');


