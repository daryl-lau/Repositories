let arr = [9, 3, 4, 0, 2, 8, 5, 1, 7, 6, 11, 10, 18, 15, 17, 12, 16, 13, 19, 14];


// 算法复杂度：O(n^2)
// 思路：把每一项的值和自己右边的值进行比较，如果比他大，两者就交换位置
function bubbleSort (arr) {
  let len = arr.length
  for (let j = 0; j < len - 1; j++) {
    for (let i = 0; i < len - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      }
      // console.log(arr);
    }
  }
  return arr
}

console.time()
console.log(bubbleSort(arr));
console.timeEnd()