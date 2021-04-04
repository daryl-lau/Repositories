import React, { useMemo, useState, useCallback } from 'react'

function fib (n) {
  if (n == 1 || n == 2) return 1
  return fib(n - 1) + fib(n - 2)
}

export default function ParentComp () {
  const [num, setId] = useState(1)
  const [any, setAny] = useState(0)


  // 当执行计算量很大的函数的时候，使用useMemo可以极大的优化
  // 只有当num发生变化的时候，才去计算结果，否则直接返回缓存的值
  // 这里不能用useCallback，因为useCallback返回一个函数，缓存的是函数，还是要执行一次
  let data = useMemo(() => {
    return fib(num)
  }, [num])


  // 还可以直接缓存元素， 如果num没有变化，
  // let child = useMemo(() => <ChildComp data={fib(num)}></ChildComp>, [num])

  function handleClick () {
    setId(num => num + 1)
  }

  function handleClick2 () {
    setAny(a => a + 1)
  }
  return (
    <div>
      <ChildComp data={data}></ChildComp>
      {/* {child} */}
      <p>{any}</p>
      <button onClick={handleClick}>点击1</button>
      <button onClick={handleClick2}>点击2</button>
    </div>
  )
}

class ChildComp extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate () {
    console.log('child render11');
  }

  render () {
    console.log(this.props);
    return <p>result: {this.props.data}</p >
  }
}