let arr = [1, 2, 5, 3, 7, [11, 23, 56, 24, [123, 411, 214, 325, 21]], [1, 7, 4, 6]]

Array.prototype.flat = function () {
  let arr = []
  this.forEach(item => {
    if (Array.isArray(item)) {
      arr = arr.concat(item.flat())
    } else {
      arr.push(item)
    }
  })
  return arr
}

console.log(arr.flat());