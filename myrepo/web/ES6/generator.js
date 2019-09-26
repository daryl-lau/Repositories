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
// console.log(g.next());  // { value: 'ending', done: false }
// console.log(g.next());  // { value: 'undefined', done: false }
// console.log(g.next());  // { value: 'undefined', done: false }


// 递归执行
function next() {
    let {value, done} = g.next();
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
console.log(s.next());
console.log(s.next('传进来的1'));
console.log(s.next('传进来的2'));