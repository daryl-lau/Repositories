let myString = 'aaabcdeeeghhhaaaaaaaffiooo0000000';

function maxRepeactString (str) {
  //定义一个对象，对象的每个属性是出现连续重复的字符，属性的属性值是该字符重复的个数
  let res = {};
  let j = 1
  for (let i = 0; i < str.length; i++) {
    while (str[i] == str[j]) {
      res[str[i]] = j - i + 1;
      j++
    }
  }
  return res;
}
console.time('time1')
console.log(maxRepeactString(myString));
console.timeEnd('time1')



function check (str) {
  let myStringArr = str.split('')
  let index = 0
  let res = {}
  let length = 0
  let result
  while (myStringArr.length > 0) {
    res[index] = res[index] || []
    let letter = myStringArr.shift()
    if (res[index].includes(letter)) {
      res[index].push(letter)
    } else if (res[index].length === 0) {
      res[index].push(letter)
    } else {
      index += 1
      res[index] = [letter]
    }
  }

  for (let i of Object.values(res)) {
    if (i.length > length) {
      length = i.length
      result = i
    }
  }
  return (`最长的子串为${result.join('')}，长度为${length}`)
}

console.time('time2')
console.log(check(myString));
console.timeEnd('time2')

