

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


console.log(countingSort([0, 6, 3, 1, 5, 7, 3, 1, 2, 5, 9, 2, 5, 1, 3, 1, 7, 9, 3, 7, 5, 8, 1, 2,]));

