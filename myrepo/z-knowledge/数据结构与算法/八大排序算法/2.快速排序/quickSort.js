/* 
快速排序的基本思想：
  通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。

算法描述
快速排序使用分治法来把一个串（list）分为两个子串（sub-lists）。

具体算法描述如下：
  从数列中挑出一个元素，称为 “基准”（pivot）；
  重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
  递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
*/


// 快速排序，二分法
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

let arr = [9, 3, 4, 0, 2, 8, 5, 1, 7, 6, 11, 10, 18, 15, 17, 12, 16, 13, 19, 14];
console.time();
console.log(quickSort(arr));
console.timeEnd();