let p = new Promise((resolve, reject) => { 
  console.log(1);
  Reject(2)
  
  console.log(3);
})

p.then(d => console.log(d)).catch(e => console.log(e))

// console.log(4);