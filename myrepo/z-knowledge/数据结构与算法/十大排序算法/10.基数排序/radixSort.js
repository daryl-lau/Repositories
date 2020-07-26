/* 
基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。
有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。

算法描述
  取得数组中的最大数，并取得位数；
  arr为原始数组，从最低位开始取每个位组成radix数组；
  对radix进行计数排序（利用计数排序适用于小范围数的特点）；

算法分析
  基数排序基于分别排序，分别收集，所以是稳定的。
  但基数排序的性能比桶排序要略差，每一次关键字的桶分配都需要O(n)的时间复杂度，而且分配之后得到新的关键字序列又需要O(n)的时间复杂度。
  假如待排数据可以分为d个关键字，则基数排序的时间复杂度将是O(d*2n) ，当然d要远远小于n，因此基本上还是线性级别的。
  基数排序的空间复杂度为O(n+k)，其中k为桶的数量。一般来说n>>k，因此额外空间需要大概n个左右。
*/
var counter = [];
// 定义一个函数 arr待排序数组 maxDigit数组中最大数的位数，例如[1,10,100]的maxDigit为3
function radixSort (arr, maxDigit) {
  var mod = 10;
  var dev = 1;
  for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {

    // 把待排序的数组 arr 中的每一位整数，插入对应的容器
    for (var j = 0; j < arr.length; j++) {

      // 从个位开始，得到数组中每个数的每一位并保存在 bucket 变量中
      // bucket 变量的值可能为 0 1 2 3 4 5 6 7 8 9
      // 与之对应的 counter[bucket] 容器为 0 1 2 3 4 5 6 7 8 9
      var bucket = parseInt((arr[j] % mod) / dev);

      // 如果目前 bucket 变量的值对应的 counter[bucket] 容器还不存在（未初始化），则创建（初始化）一个新的空容器
      if (counter[bucket] == null) {
        counter[bucket] = [];
      }
      // 现在把这个 bucket 变量的值插入对应的 counter[bucket] 容器的尾部
      counter[bucket].push(arr[j]);
    }

    // 把 counter[bucket] 容器里的数依次取出 
    var pos = 0;
    for (var j = 0; j < counter.length; j++) {
      // 定义一个变量 value 用于保存conter[j].shift
      var value = null;
      if (counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value;
        }
      }
    }
  }
  return arr;
}

var arr = [9, 3, 4, 0, 2, 8, 5, 1, 7, 6, 11, 10, 18, 15, 17, 12, 16, 13, 19, 14];
console.time();
console.log((radixSort(arr, 2)));
console.timeEnd();