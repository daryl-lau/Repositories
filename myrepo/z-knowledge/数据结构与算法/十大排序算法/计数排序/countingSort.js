

function countingSort (arr) {
  const max = Math.max(...arr)
  const bucket = new Array(max + 1)
  for (let i = 0; i < arr.length; i++) {
    if (!bucket[arr[i]]) {
      bucket[arr[i]] = 1
    } else {
      bucket[arr[i]] += 1
    }
  };

  console.log(bucket);
  let sortedIndex = 0;
  for (let i = 0; i < bucket.length; i++) {
    while (bucket[i] > 0) {
      arr[sortedIndex++] = i
      bucket[i] -= 1
    }
  };
  return arr
}

console.time();
console.log(countingSort([9, 3, 4, 0, 2, 8, 5, 1, 7, 6, 11, 10, 18, 15, 17, 12, 16, 13, 19, 14]));
console.timeEnd()

