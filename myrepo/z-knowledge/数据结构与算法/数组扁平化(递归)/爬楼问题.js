// 如果一共有10级台阶，每次只能爬一级或者两级，总共有多少种爬法
// 这个就是一个裴波那契数列，设台阶级数为n，当n=1时，有1种走法，当n=2时，有2中走法，当n=3时，走法等于一级走法和两级走法的和，一次类推
// [1, 2, 3, 5, 8, 13, ...]

function stairs (n) {
  if (n === 1) {
    return 1
  } else if (n === 2) {
    return 2
  }
  return stairs(n - 1) + stairs(n - 2)
}
// console.log(stairs(50));

// 优化
const climbStairs = (n) => {
  // 用一个数组保存每一次的结果
  let arr = new Array(n)
  for (let i = 1; i <= n; i++) {
    if (i < 3) {
      arr[i - 1] = i
    } else {
      // 逐一递推得到结果
      arr[i - 1] = arr[i - 2] + arr[i - 3]
    }
  }
  return n <= 0 ? 0 : arr[n - 1]
}
console.time('climbStairs')
console.log(climbStairs(50));
console.timeEnd('climbStairs')
