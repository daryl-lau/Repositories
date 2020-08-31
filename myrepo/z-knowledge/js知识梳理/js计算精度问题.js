const JSONbig = require('json-bigint')
const Decimal = require('decimal');
const Big = require('big.js')


console.log(0.1 + 0.2);   // 0.30000000000000004

/*
js只有number类型的数字类型，不像其他的有int型，float型，js中的number类型是double型，双精度浮点型，可以同时表示整数和小数
双精度浮点型总共有64个bit为，符号位，指数位，小数位分别占1,11,52个bit位，但是IEEE规定小数位默认开头是1，不占这里的位数，因此小数位总计有53位
对于一些小数，在计算的时候会先将其转化为二进制数据，但在转为二进制的过程中，会导致二进制是无限循环的，但是最多只能有53位，这就导致了精度的缺失

大数字也是这个原因，最大的安全数字是2^53-1，最小安全数字是-(2^53-1)，可以通过Number.MAX_SAFE_INTEGER，Number.MIN_SAFE_INTEGER查看
*/

// 解决方法： 引入decimal或者big专门处理小数
let x = new Big(3.14)
console.log(x.plus(0.1));          // 3.24
console.log(x.toFixed(5));        // 3.14000
console.log(x.toPrecision(5));    // 3.1400

console.log(x.add(0.21).minus(0.01).toFixed(2));  // 3.34

console.log(Big(3.681).toFixed(2));   // 3.68 四舍五入
console.log(Big(3.685).toFixed(2));   // 3.69 四舍五入

/*
大数字精度问题，如果在json中有大数字的字段，可以使用 json-bigint 把对应的大数字转为字符串，它是利用了bignumber这个库来处理大数字的
解析出来的对象原本的大数字转为了bignumber对象
或者使用正则表达式，进行匹配，把数字转为字符串，正则的缺点是需要自己根据自己的实际情况编写正则，无法做到通用性
*/

// 使用正则：
let json1 = `{"goods":[{"id":90071992547419999,"preice":200},{"id":90071992547419988}]}`
console.log(json1);
console.log(json1.replace(/\"id\":(\d+)/g, `"id":"$1"`));

// 使用 json-bigint
let json2 = `{"goods":[{"id":90071992547419999,"preice":200},{"id":90071992547419988}]}`
let res = JSONbig.parse(json2)        // 解析
console.log(JSONbig.stringify(res));  // 序列化，又转回json格式，大数字还是以数字的形式存在
console.log(JSON.stringify(res));     // 对json-bigint解析出来的对象，使用原生的JSON.stringify方法，可以直接将大数字转为字符串

console.log(res);
console.log(res.goods[0].id.toString());  // 也可以通过toString方法，将某个单独的大数字取出来转为字符串



