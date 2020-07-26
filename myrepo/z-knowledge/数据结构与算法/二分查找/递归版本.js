let arr = [1, 4, 5, 7, 9, 12, 15, 17, 19, 25, 26, 29, 54, 56, 76, 84, 93, 100]

function binarySearch (arr, target, low = 0, high = arr.length - 1) {
  const n = Math.floor((low + high) / 2);
  const cur = arr[n];
  if (cur === target) {
    return `${target} 索引号为：${n}`;
  } else if (cur > target) {
    return binarySearch(arr, target, low, n - 1);
  } else if (cur < target) {
    return binarySearch(arr, target, n + 1, high);
  }
  return -1;
}

console.log(binarySearch(arr, 29));

