let func = async function () {
    return 1
}


// async函数返回的是一个promise对象
// async函数内部return语句返回的值，会成为then方法回调函数的参数
func().then((data) => {
    console.log(data);
})



// 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行
// 第二个await出错了，第一个await也无法执行
async function f() {
    let res = await Promise.resolve('hello world'); // 不会执行
    let res1 = await Promise.reject('出错了');
    console.log(res);
    console.log(res1);
}

f().catch(e => console.log(e))  // 出错了


// 有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。
// 这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
async function f1() {
    try {
        await Promise.reject('出错了');
    } catch (e) {
        console.log(e, 'err');
    }
    let res = await Promise.resolve('hello world'); // 不会执行
    console.log(res, 'res');
}
f1()