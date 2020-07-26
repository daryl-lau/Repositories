// 归并排序和快排类似，都是分而治之的思想，快排是把比中间值大的放一边，小的放另一边
// 而归并排序是直接进行切分，没有一开始比较大小

/* 

归并排序是建立在归并操作上的一种有效的排序算法。
该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。
将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。 

算法描述
  把长度为n的输入序列分成两个长度为n/2的子序列；
  对这两个子序列分别采用归并排序；
  将两个排序好的子序列合并成一个最终的排序序列。


算法分析
  归并排序是一种稳定的排序方法。
  和选择排序一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，因为始终都是O(nlogn）的时间复杂度。
  代价是需要额外的内存空间。
*/

function mergeSort (arr) {
  let len = arr.length;
  if (len < 2) {
    return arr;
  }
  let middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge (left, right) {
  let result = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length)
    result.push(left.shift());

  while (right.length)
    result.push(right.shift());

  return result;
}

let arr = [9, 3, 4, 0, 2, 8, 5, 1, 7, 6, 11, 10, 18, 15, 17, 12, 16, 13, 19, 14];
console.time();
console.log(mergeSort(arr));
console.timeEnd();