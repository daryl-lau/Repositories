
// 这种性能最好，没有用到递归
function fib1 (n) {
  if (n <= 0) return 0
  let arr = new Array(n)
  for (let i = 1; i <= n; i++) {
    if (i < 3) {
      arr[i - 1] = 1
    } else {
      arr[i - 1] = arr[i - 2] + arr[i - 3]
    }
  };
  return arr[n - 1]
}
console.time('fib1');
console.log(fib1(50));  // 平均10ms
console.timeEnd('fib1');
