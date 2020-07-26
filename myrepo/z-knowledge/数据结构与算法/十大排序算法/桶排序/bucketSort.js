var cask = function (arr, caskCount) {
  //不是数组，返回false
  if (toString.call(arr) != '[object Array]') {
    return false;
  }
  //获取数组的长度
  var len = arr.length;
  if (len <= 1) {
    return arr;//长度小于等于1不用排序
  }
  var list = [],//装桶的桶，用它来控制存储桶的编号
    result = [],//返回的结果
    max = arr[0],
    min = arr[0];
  //默认桶的个数为10
  var caskCount = parseInt(caskCount) > 0 ? parseInt(caskCount) : 10;
  //获取数组的最大值和最小值
  for (var i = 1; i < len - 1; i++) {
    max = arr[i] <= max ? max : arr[i];
    min = arr[i] >= min ? min : arr[i];
  }
  //分成caskCount个桶，桶所占用的范围
  var range = (max - min) / caskCount;
  for (var i = 0; i < len; i++) {
    //桶的数值减去最小数 min 获取的是桶占用的范围，再除以一个桶的范围，就是获取对应的桶编号
    var index = Math.floor((arr[i] - min) / range);
    //桶里是否有值，有值则进行排序
    if (list[index]) {//用数组模拟桶
      //获取桶最后一个值的下标 
      var k = list[index].length - 1;
      //桶最后的值大于要插进来的值，所以要把这个值插到桶的前面去，但不知道这个值要插入到前面的哪个位置，所以，就只能对比排序了
      //对桶进行排序
      while (k >= 0 && list[index][k] > arr[i]) {
        //桶前面的数字放到后面去
        list[index][k + 1] = list[index][k];//第一个k+1为新增的桶
        //小的提前一个位置
        //list[index][k] = arr[i];
        k--;
      }
      //不用排序的，直接加在桶的最后面
      list[index][k + 1] = arr[i];
    } else {
      //没有值则生成桶，并把值放到对应的桶中
      list[index] = [];
      list[index][0] = arr[i];
    }
  }
  //合并桶
  var n = 0;
  while (n <= caskCount) {
    if (list[n]) {
      result = result.concat(list[n]);
    }
    n++;
  }
  return result;
}


var arr = [9, 3, 4, 0, 2, 8, 5, 1, 7, 6, 11, 10, 18, 15, 17, 12, 16, 13, 19, 14];
console.time();
console.log((cask(arr, 10)));
console.timeEnd();