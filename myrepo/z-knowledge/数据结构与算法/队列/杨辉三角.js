/* 
打印杨辉三角
     1
    1 1
   1 2 1
  1 3 3 1
 1 4 6 4 1
*/

const Queue = require('./Queue')

function yanghui (n) {
  let queue = new Queue()
  queue.enqueue(1)
  for (let i = 1; i <= n; i++) {
    let line = ''   // 保存每一行的结果
    let pre = 0     // 存储前一个弹出的值
    for (let j = 0; j < i; j++) {
      let item = queue.dequeue()
      line += item + " "
      queue.enqueue(item + pre)
      pre = item
    };
    // 每一层最后一个数是1，上面的for循环中没有计算最后一个数
    queue.enqueue(1)
    console.log(line);
  };
}

yanghui(10)


