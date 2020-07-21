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