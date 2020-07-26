let arr = [50, 321, 5, 13, 52, 87, 121, 0, 23, 41];

// [12, 321, 5, 12, 52, 87, 121, 0, 23, 41]
// left                                 right
// left从左向右                         right从右向左
// 如果left指针上的值比flag小，left+1    如果right指针上的值比flag大，right-1
// 把这两个上的值互换位置，再继续执行上述流程

// 定义两个指针，左边排头和右边排尾
function quickSort (arr, leftPointer = 0, rightPointer = arr.length - 1) {

  if (leftPointer >= rightPointer) return

  let left = leftPointer
  let right = rightPointer
  let flag = arr[left]

  while (left < right) {
    // 记住，需要先处理右边指针，再处理左边指针
    if (arr[right] >= flag) {
      right--
    }
    arr[left] = arr[right]

    if (arr[left] <= flag) {
      left++
    }
    arr[right] = arr[left]

    // console.log(arr);
  }
  arr[left] = flag
  quickSort(arr, leftPointer, left - 1)
  quickSort(arr, left + 1, rightPointer)
  return arr
}
console.log(quickSort(arr));