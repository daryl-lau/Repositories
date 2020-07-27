/* 
将中缀表达式转为逆波兰表达式
*/
const Stack = require('./Stack')

function toRPolish (exp) {
  const priority = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2
  }

  let result = []
  let stack = new Stack()
  for (let i = 0; i < exp.length; i++) {
    let item = exp[i]
    // 如果是数字，直接放到result中
    if (!isNaN(item)) {
      result.push(item)
    } else if (item === "(") {
      // 遇到左括号，入栈
      stack.push(item)
    } else if (item === ")") {
      // 遇到又括号，把栈顶元素弹出，放到result中，直到遇到左括号
      while (stack.top() !== "(") {
        result.push(stack.pop())
      }
      // 弹出左括号
      stack.pop()
    } else {
      // 遇到运算符，把栈顶的运算符弹出，直到栈顶的运算符优先级小于当前运算符
      while (!stack.isEmpty() && ["+", "-", "*", "/"].includes(stack.top()) && priority[stack.top()] >= priority[item]) {
        // 把弹出的运算符加入到result
        result.push(stack.pop())
      }
      // 当前运算符入栈
      stack.push(item)
    }
    console.log(item, result, stack);
  };

  while (!stack.isEmpty()) {
    result.push(stack.pop())
  }
  return result
}

// '1+2*((10/2)+2-10)'
console.log(toRPolish(['1', '+', '2', '*', '(', '(', '10', '/', '2', ')', '+', '2', '-', '10', ')']));
