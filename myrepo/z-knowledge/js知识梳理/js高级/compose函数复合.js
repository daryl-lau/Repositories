

// 实现一个compose
// compose(fn1, fn2, fn3)  ===>   fn3(fn2(fn1()))

function compose (...funcs) {
  if (funcs.length == 0) {
    return function (args) { return args }
  }

  if (funcs.length == 1) {
    return funcs[0]
  }

  return funcs.reduce((res, curr) => {
    return function (...args) { return curr(res(...args)) }
  })
}

// 测试
function toUpperCase (str) {
  return str.toUpperCase()
}

function toLowerCase (str) {
  return str.toLowerCase()
}

function addPrefix (str) {
  return 'prefix: ' + str
}

function addSuffix (str) {
  return str + ' suffix'
}

console.log(compose(toUpperCase, addPrefix, addSuffix)('QWer'));  // prefix: QWER suffix
console.log(compose()('xxx', 'yyy'));