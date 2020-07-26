/*
普通的1 + 2 是中缀表达式
后缀表达式是把运算符放在数字的后面，1 + 2 就是 1 2 +

4 + 13 * 5 
===>
['4', '13', '5', '*', '+']

*/

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

  clear () {
    this.stack = []
  }
}

function calc (exp) {
  let stack = new Stack()

  for (let i = 0; i < exp.length; i++) {
    let item = exp[i]
    if (['+', '-', "*", '/'].includes(item)) {
      let value1 = stack.pop()
      let value2 = stack.pop()
      let str = `${value2} ${item} ${value1}`
      stack.push(parseInt(eval(str)).toString())
    } else {
      stack.push(item)
    }
  };
  if (stack.size() === 1) {
    return stack.pop()
  }
}

// 1+2*((10/2)+2-10)
let exp = ['1', '2', '10', '2', '/', '2', '+', '10', '-', '*', '+']
console.log(calc(exp));       // -5

let exp1 = ['4', '13', '5', '*', '+']
console.log(calc(exp1));       // 69