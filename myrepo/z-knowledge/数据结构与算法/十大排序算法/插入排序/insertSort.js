let arr = [9, 3, 4, 0, 2, 8, 5, 1, 7, 6, 11, 10, 18, 15, 17, 12, 16, 13, 19, 14];


// 复杂度：O(n^2)
// 思路：从第二项开始算，后面的每一项都和前面的数进行对比，如果它小于那个数，就和那个数交换位置
function insertSort (arr) {
  let len = arr.length
  for (let i = 1; i < len; i++) {
    for (j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      }
    }
  };
  return arr
}

console.time()
console.log(insertSort(arr));
console.timeEnd()