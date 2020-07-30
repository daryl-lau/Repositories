import React, { useState, useEffect } from 'react'

export default function CountHooks () {


  // 在class中state只能作为对象，但在useState hook中不仅仅可以使用对象，还可以使用数组，数字，字符串等
  const [count, setCount] = useState(0)

  // Similar to componentDidMount and componentDidUpdate:
  // effect不仅在组件第一次挂载的时候执行一次，且当组件更新的时候，也会执行
  // 可以在 effect hook 提供的第二个参数中，传入一个数组，数组中定义监控的状态，只有当前状态和上一个状态不一样时，才执行effect，否则不会执行，是一个优化手段
  // 如果传入一个空数组，那么effect只会在componentDidMount执行一次，清除副作用在卸载的时候执行一次，componentDidUpdate阶段都不会执行，这里副作用是否执行不会影响状态的正常更新
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;

    if (count === 300) {
      return
    }
    if (count !== 5) {
      // 最好不要再useEffect里面继续修改状态，如果不给条件，会造成死循环，因为useEffect在componentDidMount和componentDidUpdate阶段都会执行
      setCount(count + 1)
    }
  });


  //! 注意这里的setCount也是异步的 如果想要变成同步的，只能用回调函数的方式，回调函数传递的state是最新的state，在class中使用的定时器的方式不起作用
  const [fields, setfields] = useState([0]);

  function change () {
    setfields((state) => {
      return [...state, 1]
    })
    setfields((state) => {
      return [...state, 2]
    })
    // 下面这种方式在类组件的 setState 中可以使用，但是在 useState hooks中不生效
    // setTimeout(() => { 
    //   setfields([...fields, 1])
    // }, 0)
    // setTimeout(() => { 
    //   setfields([...fields, 2])
    // }, 0)
  }

  useEffect(() => {
    console.log(123, fields)
  }, [fields]);


  return (
    <div>
      <p>count: {count}</p>
      {/* 在更新过程中，count获取到的是最新值 */}
      <button onClick={() => { setCount(count + 1) }}>+1</button>
      <button onClick={change}>change</button>
    </div>
  )
}