
// 这种最简单，但是性能最差
function fib (n) {
  if (n == 1 || n == 2) return 1
  return fib(n - 1) + fib(n - 2)
}

console.time('fib');
console.log(fib(45));   // 平均8s
console.timeEnd('fib');