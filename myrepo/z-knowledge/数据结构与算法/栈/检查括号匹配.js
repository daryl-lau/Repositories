// 先进先出是队列，先进后出是栈，可以使用数组的push和pop方法实现栈

const { reduceRight } = require("underscore")

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

function validateExpression (exp) {
  const stack = new Stack()
  const left = '{[(<'
  const right = '}])>'
  let flag = true
  let popValue
  let popIndex

  for (let i = 0; i < exp.length; i++) {
    if (left.includes(exp[i])) {
      stack.push(exp[i])
    }
    if (right.includes(exp[i])) {
      popIndex = exp[i]
      popValue = stack.pop()
    }
    if (left.indexOf(popValue) !== right.indexOf(popIndex)) {
      flag = false
    }
  };
  return flag
}

console.log(validateExpression(`
function fn(){
  console.log([1,2,3], {a:2});
  return (
    <div>{this.props.name}</div>
  )
}
`));
