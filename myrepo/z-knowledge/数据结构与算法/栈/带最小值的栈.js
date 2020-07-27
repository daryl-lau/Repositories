const Stack = require('./Stack')

// 需要两个栈，分别存放数据的栈和存放最小值的栈
// 这里取最小值的时间复杂度是O(1)
class MinStack {
  constructor() {
    this.dataStack = new Stack()
    this.minStack = new Stack()
  }

  push (item) {
    // 数据栈直接压入栈顶
    this.dataStack.push(item)

    // 如果存放最小值的栈为空，或者push的值小于栈顶得值，则将其压入存放最小值的栈顶
    if (this.minStack.isEmpty() || item < this.minStack.top()) {
      this.minStack.push(item)
    } else {
      // 如果push的值大于栈顶的值，则把当前栈顶的值再压入栈顶一次，这个栈顶的值就是这个栈目前的最小值。
      // 再压一次是为了将来在弹出的时候，还能取到栈的最小值
      this.minStack.push(this.minStack.top())
    }
  }

  pop () {
    // 弹出栈顶的时候数据栈和最小值栈都进行弹出，返回弹出的数据栈的值
    this.minStack.pop()
    return this.dataStack.pop()
  }

  min () {
    if (this.minStack.isEmpty()) {
      throw new Error('栈为空')
    }

    // 获取栈的最小值，直接把最小值的栈顶返回就行了，因为当前的栈顶就是存放的最小值
    return this.minStack.top()
  }
}


let minStack = new MinStack()

minStack.push(5)
minStack.push(2)
minStack.push(1)
minStack.push(4)

console.log(minStack.min());