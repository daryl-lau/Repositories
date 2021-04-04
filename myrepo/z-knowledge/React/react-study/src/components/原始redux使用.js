import React, { useEffect } from 'react'
import { createStore } from 'redux'


// 1、先创建一个reducer，给定初始状态
// 2、使用createStore方法将reducer创建为store
// 3、通过store.getState方法获取到最新状态
// 4、通过store.dispatch方法派发actions
// 5、通过store.subscribe订阅state的改变，传入一个需要执行的函数


const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1
    default:
      return state
  }
}

const store = createStore(reducer)

export default class OriginRedux extends React.Component {

  componentDidMount () {
    store.subscribe(() => {
      console.log(store.getState())
      // 没有使用react-redux，因此这里需要自己手动刷新
      this.forceUpdate()
    })
  }

  render () {
    return (
      <div>
        <h1>count: {store.getState()}</h1>
        <button onClick={() => { store.dispatch({ type: 'increment' }) }}>+1</button>
      </div>
    )
  }
}


// console.log(store);
// export default function OriginRedux (props) {
//   useEffect(() => {
//     console.log(store);
//     store.subscribe(() => { console.log(store.getState()); })
//   })

//   return (
//     <div>
//       <h1>count: {store.getState()}</h1>
//       <button onClick={() => { store.dispatch({ type: 'increment' }) }}>+1</button>
//     </div>
//   )
// }