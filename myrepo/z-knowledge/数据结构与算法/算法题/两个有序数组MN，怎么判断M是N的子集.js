const M = [1, 4, 5, 6, 9, 10, 24, 30, 35, 49]
const N = [5, 9, 10, 30]

function check (n, m) {
  let subArr = m
  let result = true
  for (let value of n) {
    let index = subArr.indexOf(value)
    if (index >= 0) {
      subArr = subArr.slice(index)
      result = true
    } else {
      result = false
      break
    }
  }
  return result
}

console.log(check(N, M));