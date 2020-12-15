// https://zhuanlan.zhihu.com/p/108856165

type UserInfo = {
    name: string;
    age: number;
}

function showUser(arg: UserInfo){
    console.log(arg.name, arg.age)
}

// 正常情况
let jerrry: UserInfo = {name: 'jerry', age: 18}
showUser(jerrry)


// 非正常情况
let tom = 111;
// showUser(tom)    // 如果这里的tom不是UserInfo类型，这里将会报错

// 如果确定tom是对的，不想让ts报错，则需要使用类型守卫，主要的是 arg is UserInfo 返回类型
// 只要isUser函数体中的返回值是true，则满足UserInfo类型，为false则不满足
// 注意，返回类型必须是 arg is UserInfo，不能是boolean类型
// 注意，如果tom不符合UserInfo类型，ts不会报错，只是编译后执行的时候不会执行该代码
// 通常对于后端请求过来的数据，我们可以通过这个方法来进行校验，如果不符合定义的类型，则不会进行相关操作
function isUser(arg: any): arg is UserInfo {
    if(typeof arg.name === 'string' && typeof arg.age === 'number'){
        return true
    }else {
        return false
    }
}

if (isUser(tom)){
    showUser(tom)
}
