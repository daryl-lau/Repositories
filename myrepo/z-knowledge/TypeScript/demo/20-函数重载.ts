// 所谓的重载，其实就是使用相同的函数名，传入不同数量的参数或不同类型的参数，以此创建出多个方法或产生不同结果。
// ts 的重载只是类型重载，并不是java或c中的函数重载，只能根据传参的不同类型进行不同的条件判断处理逻辑，还是共用一个函数体

// 下面是最简单的方式，通过定义不同的入参和返回参，来约束函数的类型，在函数中需要根据不同的参数类型做相应的处理
function add1(a: number, b: number): number
function add1(a: string, b: string): string
function add1(a: any, b: any): any {
  if (typeof a == 'number') {
    return a + b
  }
  if (typeof a == 'string') {
    return (parseInt(a) + parseInt(b)).toString()
  }
}

// 只能传入两个参数，类型同为number或者string
add1(1, 2)
add1('1', '2')
// add1([1], [2]) // 报错
// add1(true, false) // 报错