import React, { useReducer } from 'react'

function init (initialCount) {
  console.log(initialCount, 'initialCount');
  return { count: initialCount };
}

function reducer (state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter ({ initialCount }) {
  // 这里的初始值是通过props传过来的
  // 这里使用init初始化函数，作用是如果需要根据传过来的数据做处理，然后再设置状态，这样就可以把数据处理方法组件外面来执行
  // reducer第三个参数就是初始化数据的函数，会自动把第二个参数的值传递给该函数，再由该函数返回初始的状态值，
  // 这对于复杂的处理很方便，比如需要对传入的参数进行筛选或者改造，但对于简单的，直接使用第二个参数就行了
  // 而对于有重置功能的组件来说，使用第三个参数也是非常方便的
  // 例如这里我们就在外面传入0，而初始状态是{count: 0}
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      <p>Count: {state.count}</p>
      <button
        onClick={() => dispatch({ type: 'reset', payload: initialCount })}>
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}

export default Counter
