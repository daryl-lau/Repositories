import React, { useState } from 'react'

export default function CountHooks () {

  const [count, setCount] = useState(0)

  //! 这里setCount也是异步的
  // 和class组件的setState一样，会合并操作，谁在最后执行谁，因此下面asyncChange函数调用，每次count还是加1，不是加4也不是加3
  function asyncChange () {
    setCount(count + 3)
    setCount(count + 1)
  }


  //! 如果想要变成同步的，只能用回调函数的方式，回调函数传递的state是最新的state，在class中使用的定时器的方式不起作用
  // 这里的函数执行，count每次获取到的都是最新的值，因此下面的函数调用count每次加3
  function syncChange () {
    setCount(count => {
      return count + 1
    })
    setCount(count => count + 2)

    // 下面这种方式在类组件的 setState 中可以使用，但是在 useState hooks中不生效
    // setTimeout(() => { 
    //   setCount(count + 1)
    // }, 0)
    // setTimeout(() => { 
    //   setCount(count + 1)
    // }, 0)
  }

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => { setCount(count + 1) }}>+1</button>
      <button onClick={syncChange}>syncChange</button>
      <button onClick={asyncChange}>asyncChange</button>
    </div>
  )
}