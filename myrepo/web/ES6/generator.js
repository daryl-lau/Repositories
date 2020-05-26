function* f() {
    yield 'a';
    yield 'b';
    yield 'c';
    yield 'd';
    return 'ending'
}

// console.log(f());


const g = f();
// console.log(g.next());  // { value: 'a', done: false }
// console.log(g.next());  // { value: 'b', done: false }
// console.log(g.next());  // { value: 'c', done: false }
// console.log(g.next());  // { value: 'd', done: false }
// console.log(g.next());  // { value: 'ending', done: true }
// console.log(g.next());  // { value: 'undefined', done: true }
// console.log(g.next());  // { value: 'undefined', done: true }


// 递归执行
function next() {
    let { value, done } = g.next();
    console.log(value);
    if (!done) {
        next()
    }
}
// next();

// 传值
function* say() {
    let a = yield '1';
    console.log(a);

    let b = yield '2';
    console.log(b);

    return 'ending'
}

const s = say();

// next()只会指定到yield就不往下执行了
console.log(s.next());      // 这里仅会打印{ value: '1', done: false }，因为next()碰到yield就结束了，a还没来得及打印，但是会在下一个next()中进行打印
console.log(s.next('传进来的1'));    // next()穿进去的参数，可以作为上一个yield表达式的返回值，注意是上一个，不是这一个
console.log(s.next('传进来的2'));