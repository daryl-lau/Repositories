export function createStore (reducer, enhancer) {

  //增强createStore
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  // 保存状态
  let currentState = undefined;
  // 回调函数
  let currentListeners = [];
  function getState () {
    return currentState
  }
  function subscribe (listener) {
    currentListeners.push(listener)
  }
  function dispatch (action) {
    //更新状态
    currentState = reducer(currentState, action)
    //变更通知
    currentListeners.forEach(v => v())
    return action
  }
  //初始化状态
  dispatch({ type: '@IMOOC/KKB-REDUX' })
  return { getState, subscribe, dispatch }
}

export function applyMiddleware (...middlewares) {
  // 返回强化以后函数
  return createStore => (...args) => {
    //完成createStore该有的⼯作
    const store = createStore(...args)
    //原先的dispatch
    let dispatch = store.dispatch
    //传递给中间件的参数
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 使中间件可以获取状态值、派发action
    const middlewareChain = middlewares.map(middleware =>
      middleware(midApi))

    // compose可以middlewareChain函数数组合并成⼀个函数
    //强化后的dispatch，按顺序执⾏中间件函数
    dispatch = compose(...middlewareChain)(store.dispatch)
    return {
      //返回全新没有修改过的store,和增强过的dispatch
      ...store,
      dispatch
    }
  }
}

export function compose (...funcs) {
  if (funcs.length == 0) {
    return arg => arg
  }
  if (funcs.length == 1) {
    return funcs[0]
  }
  return funcs.reduce((left, right) => (...args) =>
    right(left(...args)))
}