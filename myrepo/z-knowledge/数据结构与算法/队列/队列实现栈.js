const Queue = require('./Queue')


class Stack {
  constructor() {
    this.dataQueue = new Queue()
    this.emptyQueue = new Queue()
    this._dataQueue = null
    this._emptyQueue = null
  }

  // 这个方法是判断dataQueue是不是空的，如果是空的，就把dataQueue和emptyQueue互换，否则不变
  // 这么做是为了下面入栈和出栈的时候，保证_dataQueue都是有数据的那一个队列，_emptyQueue是空队列，这样才不会混乱
  // 每个方法实现前都要调用这个方法，保证上述规则能被正确执行
  initQueue () {
    if (this.dataQueue.isEmpty()) {
      this._dataQueue = this.emptyQueue
      this._emptyQueue = this.dataQueue
    } else {
      this._dataQueue = this.dataQueue
      this._emptyQueue = this.emptyQueue
    }
  }

  // 往栈里面push就直接往_dataQueue里面入队列，入队列前调用initQueue方法，保证添加的新数据是向有数据的那个队列里面添加的
  push (item) {
    this.initQueue()
    this._dataQueue.enqueue(item)
  }

  // 弹出栈顶，此时把_dataQueue队列的元素依次取出放到空的队列里面去，最后留下一个，取出并返回；
  // 此时_dataQueue队列就是空的了，而_emptyQueue队列此时就是弹出了顶部元素剩下的队列，是有值的
  // 下次入栈的时候会先调用initQueue方法，如果dataQueue是空的，就把emptyQueue和dataQueue互换，保证入栈都是往有数据的那个里面入栈
  pop () {
    this.initQueue()
    while (this._dataQueue.size() > 1) {
      this._emptyQueue.enqueue(this._dataQueue.dequeue())
    }
    return this._dataQueue.dequeue()
  }

  size () {
    this.initQueue()
    return this._dataQueue.size()
  }
}

let stack = new Stack()

stack.push(10)
stack.push(11)
stack.push(12)
stack.push(13)

console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop())
console.log(stack.size());