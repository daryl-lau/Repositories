// 下面性能比普通版好非常多
function fib (n) {
  let cache = []
  return helper(cache, n)
}

function helper (cache, n) {
  if (n == 1 || n == 2) return 1
  if (cache[n]) return cache[n]
  cache[n] = helper(cache, n - 1) + helper(cache, n - 2)
  return cache[n]
}

console.time('fib');
console.log(fib(50));  // 平均20ms
console.timeEnd('fib');