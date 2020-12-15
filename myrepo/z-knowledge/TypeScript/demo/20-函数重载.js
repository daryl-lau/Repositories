// 所谓的重载，其实就是使用相同的函数名，传入不同数量的参数或不同类型的参数，以此创建出多个方法或产生不同结果。
function add1(a, b) {
    if (typeof a == 'number') {
        return a + b;
    }
    if (typeof a == 'string') {
        return (parseInt(a) + parseInt(b)).toString();
    }
}
// 只能传入两个参数，类型同为number或者string
add1(1, 2);
add1('1', '2');
add1('1', 2);
// add1([1], [2]) // 报错
// add1(true, false) // 报错
