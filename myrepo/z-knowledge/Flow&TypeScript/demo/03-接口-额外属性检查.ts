interface Label {
  label: string
}

function printLabel(labelledObj: Label) {
  console.log(labelledObj.label);
}

let myObj2 = { size: 10, label: "Size 10 Object" };
printLabel(myObj2);

/*
* 上面的接口允许我们传递除了label的额外属性，上面这样写没有问题
* 但是当我们把myObj2直接写到函数中，ts会校验不通过
* 这是因为对象字面量会被特殊对待而且会经过额外的属性检查
*/
// printLabel({ size: 10, label: "Size 10 Object" });   // 这里size报红

let obj = <Label>{}
obj.label = 'string'
// obj.aaa = 123  // 这里报错，只有在断言后面直接设置的时候，才能添加额外的属性，就像下面这样

// 解决这个可以使用断言
printLabel(<Label>{ size: 10, label: "Size 10 Object" })



// 也可以像上面一样，把对象参数单独保存为一个变量，也可以绕过检查
let myObj3 = { size: 10, label: "Size 10 Object" };
printLabel(myObj3);




// 最佳方案，添加字符串索引签名，接收任意类型的参数，只要不是label属性，则不关心其类型到底是什么
// propName 可以任意取名
interface NewLabel {
  label: string;

  // 属性名是string，值是任意值都可以
  [propName: string]: any
}

function newpPrintLabel(labelledObj: NewLabel) {
  console.log(labelledObj.label);
}

newpPrintLabel({ size: 10, label: "Size 10 Object" })
