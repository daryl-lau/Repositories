/* 
实现一个数据结构，可以往里面添加数字，也能判断一个数字是否存在
普通方法使用数组push和遍历查询，但是对于亿级别的数据，遍历查询是很慢的，因此可以使用BitMap
! BitMap要求存入的数字不能是重复的
BitMap和数组不同，BitMap只能存储某个数是否存在，可以用于大数据去重，大数据排序，两个集合取交集
BitMap只有在处理大数据的时候才有优势，而且要求数据集紧凑，不重复
*/

/* 
  数据范围是0-100，那么只需要4个整数就可以表示4*32个数的存在与否，创建一个大小为4的数组

  只能addMember时，先用item/32，确定item在数组中的索引（arr_index），
  然后用item%32，确定在整数的哪个二进制位上进行操作（bit_index），最后执行bit_arr[arr_index] = bir_arr[arr_index] | 1 << bit_index

  执行isExist时，先用item/32，确定item在数组中的索引（arr_index），
  然后用item%32，确定在整数的哪个二进制位上进行操作（bit_index），最后执行bitArr[arr_index] & 1 << bit_index，如果结果不为0，说明item存在

  addMember(10)
  00000000 00000000 00000000 00000000     第一次原数为0
  00000000 00000000 00000100 00000000     1 << 10
  00000000 00000000 00000100 00000000     0 | 1 << 10 结果，存到数组的第0位上

  addMember(20)
  00000000 00000000 00000100 00000000     数组中的结果
  00000000 00010000 00000000 00000000     1 << 20
  00000000 00010000 00000100 00000000     10 | 1 << 20，结果，存到数组第0位上

  isExist(10)
  00000000 00010000 00000100 00000000     数组中的结果
  00000000 00000000 00000100 00000000     1 << 10
  00000000 00000000 00000100 00000000     数组中的结果 & 1 << 10，结果大于0，表示10存在

  isExist(15)
  00000000 00010000 00000100 00000000     数组中的结果
  00000000 00000000 10000000 00000000     1 << 15
  00000000 00000000 00000000 00000000     数组中的结果 & 1 << 10，结果等于0，表示15不存在
*/
class BitMap {
  // 数据的长度
  constructor(size) {
    let arrSize = Math.ceil(size / 32)
    this.bitArr = new Array(arrSize)
    for (let i = 0; i < this.bitArr.length; i++) {
      this.bitArr[i] = 0
    };
  }

  addMember (item) {
    let arr_index = Math.floor(item / 32)   // 决定在数组中的索引
    let bit_index = item % 32               // 决定在整个32bit位的哪一位上
    this.bitArr[arr_index] = this.bitArr[arr_index] | 1 << bit_index
  }

  isExist (item) {
    let arr_index = Math.floor(item / 32)
    let bit_index = item % 32
    let value = this.bitArr[arr_index] & 1 << bit_index
    if (value !== 0) {
      return true
    }
    return false
  }
}

let bitMap = new BitMap(4)
bitMap.addMember(10)
bitMap.addMember(15)
console.log(bitMap.isExist(15));  // true
console.log(bitMap.isExist(20));  // false

// 利用BitMap进行数据排序
//! 排序的数据不能有重复的 
let arr = [9, 3, 4, 0, 2, 8, 5, 1, 7, 6, 11, 10, 18, 15, 17, 12, 16, 13, 19, 14];
let sortedArr = []
let sortBitMap = new BitMap(4)

// 先把所有的数放到BitMap中
for (let i = 0; i < arr.length; i++) {
  sortBitMap.addMember(arr[i])
};

// 循环遍历数字，如果该数字在BitMap中存在，则添加到排序数组中
for (let i = 0; i <= 20; i++) {
  if (sortBitMap.isExist(i)) {
    sortedArr.push(i)
  }
};
console.log(sortedArr);