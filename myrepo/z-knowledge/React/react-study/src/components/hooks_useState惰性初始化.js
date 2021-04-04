import React, { useState } from 'react'

function fib (n) {
  if (n == 1 || n == 2) return 1
  return fib(n - 1) + fib(n - 2)
}

export default function Comp () {

  // 惰性初始化，useState中传入一个函数即可，这个函数只会调用一次，后面组件重新渲染的时候并不会再次调用
  // 如果下面不使用函数，而是直接fib(40)，这是函数的调用，这会在每次渲染的时候都执行一遍该函数，即使后续的重新渲染不会用到，但也会执行
  // 传入函数就可以使其只在初始化的时候执行一次，后续的重新渲染不会重新执行该函数，从而提高性能
  const [result] = useState(() => fib(40))
  const [count, setCount] = useState(0)

  function handleClick () {
    setCount(c => c + 1)
  }

  return (
    <div>
      <p>{result}</p>
      <p>{count}</p>
      <button onClick={handleClick}>+1</button>
    </div>
  )
}