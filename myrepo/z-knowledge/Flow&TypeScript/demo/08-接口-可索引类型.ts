/* 
* 可索引类型
*/
// 定义索引key为number类型，索引值为string类型
// 这个索引签名表示了当用 number去索引StringArray时会得到string类型的返回值。
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myArray1: StringArray
myArray1 = { 1: 'jack', 2: 'rose' }

let myStr: string = myArray[0];