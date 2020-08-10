/* 
* 验证一个数是否是质数，又称为素数
* 一个大于1的自然数，除了1和它自身外，不能被其他自然数整除的数叫做质数
* 最小的质数是2，它也是唯一的偶数质数
*/
function isPrime (num) {
  if (num === 2 || num === 3) return true
  if (num % 2 === 0) return false

  let divisor = 3
  let limit = Math.sqrt(num); // 平方根
  while (limit >= divisor) {
    if (num % divisor === 0) {
      return false;
    }
    else {
      divisor += 2;
    }
  }
  return true;
}

console.log(isPrime(30)); // false
console.log(isPrime(31)); // true