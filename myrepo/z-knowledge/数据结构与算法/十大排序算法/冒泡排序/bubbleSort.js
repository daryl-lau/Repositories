let arr = [12, 321, 5, 12, 5, 2, 1, 0, 23, 41];


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
console.log(bubbleSort(arr));