const Queue = require('./Queue')

function fib (n) {
  if (n == 1 || n == 2) {
    return 1
  }

  let index = 0
  let queue = new Queue()
  queue.enqueue(1)
  queue.enqueue(1)
  while (index < n - 2) {
    queue.enqueue(queue.head() + queue.tail())
    queue.dequeue()
    index++
  }
  console.log(queue);
  return queue.tail()
}

console.time()
console.log(fib(50)); // 1 1 2 3 5 8 13 21
console.timeEnd()