import { observer, inject } from 'mobx-react'
import React from 'react'
import { dispose } from './index'
// inject表示注入那些状态，可以注入多个值，共享状态
// observer
const Comp = inject("person", "counter")(
  observer(({ person, counter }) => {

    const increment = () => {
      counter.increment()
    }
    const decrement = () => {
      counter.decrement()
    }

    // 注意，如果mobx没有使用严格模式，这里可以直接修改状态，不用经过action，这样使用很危险，数据修改源将不可控制，因此务必使用严格模式
    // 
    const showAge = () => {
      person.showAge = !person.showAge
      dispose()
    }


    return <div>
      <p>{person.labelText}</p>
      <p>{counter.count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={showAge}>显示年龄</button>
    </div>
  })
)


export default Comp