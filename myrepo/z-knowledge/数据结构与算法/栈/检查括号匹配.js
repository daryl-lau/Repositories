// 先进先出是队列，先进后出是栈，可以使用数组的push和pop方法实现栈
const Stack = require('./Stack')

function validateExpression (exp) {
  const stack = new Stack()
  const left = '{[(<'
  const right = '}])>'
  let flag = true
  let popValue
  let current

  for (let i = 0; i < exp.length; i++) {
    // 遇到左边括号，压栈
    if (left.includes(exp[i])) {
      stack.push(exp[i])
    } else if (right.includes(exp[i])) {
      // 遇到右边括号，弹出栈，并判断弹出的那个符号是不是和右边的匹配，不匹配把flag设置为false
      current = exp[i]
      popValue = stack.pop()

      // 通过索引来匹配，上面的成对的左右括号需要在同一个索引位置
      if (left.indexOf(popValue) !== right.indexOf(current)) {
        flag = false
      }
    }
  };
  // 如果栈的长度大于0，说明没有完整匹配，设置flag为false
  if (stack.size() > 0) {
    flag = false
  }
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


