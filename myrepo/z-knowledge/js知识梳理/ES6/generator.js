
// generator函数特性：
// 函数声明 function 和 函数名 之间加 * 号
// yield 关键字 返回值，使用.next() 调用 打印 {value: VALUE, done: [falise|true]}
// 当done 状态为true之后，value值就全都是undefined了，value 为 undefined不能被 for of 循环获取到
// 同一个作用域中函数不能被重复调用，执行完一遍之后 内部的done 变为 true 之后就不能再调用了
// 如果一个对象实现了 iterator 属性，且这个属性是一个generator函数，则generator函数的yield的值可以作为遍历的值

{
  function* generator () {
    yield 1
    yield 2
    return 'ending'   // return 标记结束，但还可以调用，return的值不会在for of循环中被获取到
  }

  let g = generator()
  console.log(g.next());  // { value: 1, done: false }
  console.log(g.next());  // { value: 2, done: false }
  console.log(g.next());  // { value: 'ending', done: true }
  console.log(g.next());  // { value: undefined, done: true }

  // 由于上面的next已经调用过了，内部的状态done 已经为true了，因此下面的循环不会有任何输出
  for (let a of g) {
    console.log(a);
  }
}



{
  function* generator () {
    yield 1
    yield 2
    return 'ending'   // return 标记结束，但还可以调用，return的值不会在for of循环中被获取到
  }
  let g = generator()

  for (let a of g) {
    console.log(a);
  }
  // 由于上面的循环已经把内部的done变为true了，下面的循环不会有任何输出
  for (let a of g) {
    console.log(a);
  }
}


{
  function* generator () {
    yield 1
    yield 2
    return 'ending'   // return 标记结束，但还可以调用，return的值不会在for of循环中被获取到
  }
  let g = generator()

  // 递归执行，自己写的递归会打印ending，for of 不会
  function next () {
    let { value, done } = g.next();
    console.log(value);
    if (!done) {
      next()
    }
  }
  next();
}

{
  // 传值
  function* say () {
    let a = yield '1';
    console.log(a);

    let b = yield '2';
    console.log(b);

    return 'ending'
  }

  const s = say();

  // next()只会指定到yield就不往下执行了
  console.log(s.next());
  // 这里仅会打印{ value: '1', done: false }，因为next()碰到yield就结束了，a还没来得及打印，但是会在下一个next()中进行打印



  console.log(s.next('传进来的1'));
  // 打印：
  // 传进来的1
  // { value: '2', done: false }

  // next()穿进去的参数，可以作为上一个yield表达式的返回值，注意是上一个，不是这一个


  console.log(s.next('传进来的2'));
  // 打印：
  // 传进来的2
  // { value: 'ending', done: true }
}
