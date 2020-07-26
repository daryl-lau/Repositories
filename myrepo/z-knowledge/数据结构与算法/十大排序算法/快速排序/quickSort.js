let arr = [12, 321, 5, 12, 52, 87, 121, 0, 23, 41];

// 复杂度：O(n*log(n))
function quickSort (arr) {
  // 递归退出条件，当数组长度小于等于1的时候，就表示左边或者右边没有值了，不用再进行切分了
  if (arr.length <= 1) {
    return arr
  }

  let left = []
  let right = []
  let flag = arr.pop()    // pop出来最后一个作为中分点，这个中分点随便取那一个都ok

  // 把比flag小的值放到左边的数组里，把比flag大的值放到右边数组里
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < flag) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  };
  // 递归的排序左右两边的值
  return quickSort(left).concat(flag, quickSort(right))
}
console.log(quickSort(arr));