class Stack {
  constructor() {
    this.stack = []
  }

  push (item) {
    return this.stack.push(item)
  }

  pop () {
    return this.stack.pop()
  }

  size () {
    return this.stack.length
  }

  top () {
    return this.stack[this.stack.length - 1]
  }

  isEmpty () {
    return this.stack.length === 0
  }

  clear () {
    this.stack = []
  }
}

module.exports = Stack