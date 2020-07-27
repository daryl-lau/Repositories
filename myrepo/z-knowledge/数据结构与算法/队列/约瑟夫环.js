const Queue = require('./Queue')

function del_ring (arr) {
  let queue = new Queue()
  let index = 1
  for (let i = 0; i < arr.length; i++) {
    queue.enqueue(arr[i])
  };

  while (queue.size() > 1) {
    let item = queue.dequeue()
    if (index % 3 !== 0) {
      queue.enqueue(item)
    }
    index++
  }
  return queue.head()
}


let arr = []
for (let i = 1; i <= 100; i++) {
  arr.push(i)
};

console.time();
console.log(del_ring(arr));
console.timeEnd()