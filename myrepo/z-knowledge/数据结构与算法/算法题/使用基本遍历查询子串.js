// 只使用循环实现下面功能（不能使用includes和indexOf）

a = '34'; b = '1234567'; // 返回 2
a = '35'; b = '1234567'; // 返回 -1
a = '355'; b = '12354355'; // 返回 5

String.prototype.myIndexOf = function (str) {
  const string = this.valueOf()
  for (let i in string) {
    if (str[0] === string[i]) {
      let temp = true
      // for (let j in str) {
      //   console.log(j);
      //   if (str[j] !== string[+i + +j]) {
      //     temp = false
      //   }
      // }
      for (let j = 0; j < str.length; j++) {
        if (str[j] !== string[+i + +j]) {
          temp = false
        }
      };
      // for (let j in Object.keys(str)) {
      //   if (str[j] !== string[+i + +j]) {
      //     temp = false
      //   }
      // }
      if (temp) {
        return i
      }
    }
  }
  return -1
}

console.log('hello world!'.myIndexOf('ll'));

for (let i in b) {
  console.log(i);
}

for (let j in Object.keys(b)) {
  console.log(j);
}



















// function isContain (a, b) {
//   for (let i in b) {
//     if (a[0] === b[i]) {
//       let tmp = true;
//       for (let j in a) {
//         if (a[j] !== b[~~i + ~~j]) {
//           tmp = false;
//         }
//       }
//       if (tmp) {
//         return i;
//       }
//     }
//   }
//   return -1;
// }


// console.log(isContain(a, b));
