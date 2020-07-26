// 二分查找高效的前提是数据结构是有序的

let arr = [1, 4, 5, 7, 9, 12, 15, 17, 19, 25, 26, 29, 54, 56, 76, 84, 93, 100]

function search (arr, target) {
  let start = 0
  let end = arr.length - 1
  let mid

  while (start <= end) {
    mid = Math.floor((start + end) / 2)
    if (target === arr[mid]) {
      return `${target} 索引号为：${mid}`
    }

    if (target > arr[mid]) {
      start = mid + 1
    } else if (target < arr[mid]) {
      end = mid - 1
    }
  }
  return -1
}

console.log(search(arr, 29));
