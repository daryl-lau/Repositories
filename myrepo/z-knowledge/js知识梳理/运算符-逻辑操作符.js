
// 首先说一下，其他数据类型转换为布尔类型的规则: null、undefined、0、NaN、空字符、false串转换为false，其他转化为 true。
// JavaScript 中有三种逻辑运算符：

// 1. 逻辑非 !
// 首先把数据转化为布尔值，然后取反，结果为 true 或 false。

var a = [1, 2, 3];
var b = "hello";
var obj = new Object();
var d;

console.log(!"");   //true
console.log(!d);    //true
console.log(!a);    //false
console.log(!b);    //false
console.log(!obj);  //false


// 下面的都是console出来的值，如果是Boolean()，结果只会是bool值
// 和bash中的&& 和 || 类似
// 在bash中，cmd1 && cmd2，当cmd1执行成功的时候，才执行cmd2，否则不执行
// 在bash中，cmd1 || cmd2，当cmd1执行失败的时候，才执行cmd2，否则不执行
// 下面的&&可以理解为，当第一个值为true的时候，返回第二个值，否则返回第一个值；
// 下面的||可以理解为，当第一个值为false的时候，返回第二个值，否则返回第一个值；

// 2. 逻辑与 &&
// JavaScript 中逻辑与和其他语言不太一样，如果第一个操作数是 true(或者能够转为 true) ，计算结果就是第二个操作数，
// 如果第一个操作数是 false，结果就是false（短路计算），对于一些特殊数值不遵循以上规则。
// (个人理解为: 如果运算的第一个操作数为true, 则返回第二个操作数, 反之则返回第一个操作数)

console.log(true && 10);            //第一个操作数是true，结果是第二个操作，也就是10
console.log(false && b);            //第一个操作数是false，结果flase
console.log(100 && false);          //第一个操作数是100，结果flase
console.log(undefined && false);    //第一个操作数是undefined，结果undefined
console.log(NaN && false);          //第一个操作数是NaN，结果NaN
console.log(null && false);         //第一个操作数是null，结果null
console.log('' && false);           //第一个操作数是空串，结果空串
console.log(0 && 100);              //结果是0
console.log(5 && 100);              //100
console.log(a && b);                //hello
console.log(obj && 200);            //200

// 3. 逻辑或 ||
// 如果第一个操作数不是 false，结果就是第一个操作数，否则结果是第二个操作数。
// 如果第一个操作数能够转为 true，结果就是第一个操作数
// (个人理解为:如果运算的第一个操作数为 true,则返回第一个操作数,反之则返回第二个操作数)

console.log(true || 10);        //第一个操作数是true，结果是第一个操作，也就是true
console.log(false || b);        //第一个操作数是false，结果是第二个操作数b
console.log(100 || false);      //第一个操作数是100，结果100
console.log(undefined || 9);    //第一个操作数是undefined转false，结果9
console.log(NaN || false);      //第一个操作数是NaN转false，结果第二个操作数
console.log(null || a);         //第一个操作数是null转false，结果a
console.log('' || false);       //第一个操作数是空串转false，结果第二操作数
console.log(0 || 100);          //结果是100
console.log(5 || 100);          //5
console.log(a || b);            //a
console.log(obj || 200);        //obj
