
// 动态规划保证所有的都是最优解
class Change {
  constructor(changeType) {
    this.changeType = changeType
    this.cache = {}
  }

  getChange (amount) {
    let min = []
    if (!amount) {
      return []
    }
    console.log(this.cache, amount);
    if (this.cache[amount]) { // 读缓存
      return this.cache[amount]
    }
    for (let i = 0; i < this.changeType.length; i++) {
      const leftAmount = amount - this.changeType[i]
      let newMin
      if (leftAmount >= 0) {
        newMin = this.getChange(leftAmount) // 这⼀句就是动态规划的体现
      }
      console.log('newMin', newMin);
      if (leftAmount >= 0 && (newMin.length < min.length - 1 || !min.length)) { // 如果存在更小的找零硬币数, 则执⾏后面语句
        min = [this.changeType[i]].concat(newMin)
      }
    }
    return this.cache[amount] = min
  }
}


// let c = new Change([1, 5, 10, 20, 50, 100])
// console.log(c.getChange(20));
// console.log(c.getChange(35));
// console.log(c.getChange(87));
// console.log(c.getChange(289));

let b = new Change([1, 3, 4])
console.log(b.getChange(6));    // 这里是[3, 3]，而不是贪心算法的[4, 1, 1]