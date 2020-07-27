class Queue {
  constructor() {
    this.queue = []
  }

  enqueue (item) {
    this.queue.push(item)
  }

  dequeue () {
    return this.queue.shift()
  }

  head () {
    return this.queue[0]
  }

  tail () {
    return this.queue[this.queue.length - 1]
  }

  size () {
    return this.queue.length
  }

  clear () {
    this.queue = []
  }

  isEmpty () {
    return this.queue.length === 0
  }
}

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