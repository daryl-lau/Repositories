// 保留三位⼩数
// parseToMoney(1234.56); // return '1,234.56'
// parseToMoney(123456789); // return '123,456,789'
// parseToMoney(1087654.3211); // return '1,087,654.321'
// parseToMoney(1087654.12172); // return '1,087,654.321'

// 自带了一个toLocaleString()可以实现上述功能


function parseToMoney (num) {
  let str = String(num)
  let [int, float] = str.split('.')
  let temp = ','
  if (int.length > 3) {
    for (let i = int.length - 1; i >= 0; i--) {
      if (temp.indexOf(',') < 3) {
        temp = int[i] + temp
      } else {
        temp = int[i] + ',' + temp
      }
    }
  }

  if (float && float.length > 3) {
    let sub = float.substr(0, 3)
    if (float[3] >= 5) {
      float = String(~~sub + 1)
    } else {
      float = sub
    }
  }
  if (float) {
    return temp.substring(0, temp.length - 1) + '.' + float
  } else {
    return temp.substring(0, temp.length - 1)
  }
}


console.log(parseToMoney(1234.56));
console.log(parseToMoney(123456789));
console.log(parseToMoney(1087654.321));
console.log(parseToMoney(102328254.12282));