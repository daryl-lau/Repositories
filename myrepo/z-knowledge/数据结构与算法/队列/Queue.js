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

module.exports = Queue