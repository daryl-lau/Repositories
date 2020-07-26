
// 贪心算法只能保证局部最优解，像下面b的那个例子，就不是最优解，但其他大部分是最优解
class Change {
  constructor(changeType) {
    this.changeType = changeType
  }

  getChange (amount) {
    if (this.changeType.includes(amount)) return [amount]
    if (!amount) return []
    let c = []
    for (let i = this.changeType.length; i >= 0; i--) {
      while (amount >= this.changeType[i]) {
        c.push(this.changeType[i])
        amount -= this.changeType[i]
      }
    };
    return c
  }
}

let c = new Change([1, 5, 10, 20, 50, 100])
console.log(c.getChange(20));
console.log(c.getChange(35));
console.log(c.getChange(87));
console.log(c.getChange(289));
console.log(c.getChange(300));

let b = new Change([1, 3, 4])
console.log(b.getChange(6));    // 这里是[4, 1, 1]，而不是最优解[3, 3]