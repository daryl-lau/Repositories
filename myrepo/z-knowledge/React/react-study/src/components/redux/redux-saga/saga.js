import { takeEvery, call, put, fork, takeLatest, takeLeading, select } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'

// import axios from 'axios'


/* 
redux-sage分为watch saga 和 work saga。
watch saga 用于监听action，如果有dispatch action，那么就会被监听，执行相应的处理函数
此处理函数就是work saga，在此函数中可以执行异步操作
任何effect的执行都需要使用在 yield 关键字之后

watcher saga  
takeEvery     监听类型，同一时间允许多个处理函数同时进行，并发
takeLatest    监听类型，同一时间只能有一个处理函数在执行，后面开启的任务会执行，前面的会取消执行
takeLeading   如果当前有一个处理函数正在执行，那么后面开启的任务都不会被执行，直到该任务执行完毕
三个都可以进行传参，takeXXX(pattern, workSaga, ...args)，action默认会添加到参数的末尾

work saga
effect 创建器
call    是一个创建effect的工厂函数，创建一个effect对象，yield effect 会把这个对象里的函数执行，let callEffect = call(fn, ...args)，
        ...args参数会依次传递给fn函数
        代码如下：
          function p (cityId) {
            return fetch('https://baihuzi.com:5443/houses?cityId=' + cityId)
              .then(res => res.json())
              .then(data => { return data })
          }
          const effect = call(p, action.payload)
          console.log(effect , 'effect');
          const res = yield effect
          console.log(res);

fork    和call的功能一样，只不过创建的effect执行的时候是异步的，let forkEffect = fork(fn, ...args)
put     派发一个action
select  获取当前state中的部分数据，第一个参数是一个函数，函数的参数是state，即当前状态，后面的参数依次传递给第一个函数，作为该函数的参数
        select(fn, ...args)  ≈  fn(state, ...args)
        代码如下：
          function selector (state, index) {
            return state[index]
          }

          let state2 = yield select(selector, 0)
          console.log(state2, 'select2');

          select 也可以不传任何参数，返回值就直接是当前的所有状态


如果在处理函数中想要并发的执行副作用，可以使用
const [users, repos] = yield [
  call(fetch, '/users'),
  call(fetch, '/repos')
]
的方式来进行，此时会同时开始请求/user和/repos


*/


// work saga---------------saga-----------
function* getHouseList (action) {
  console.log(action, 'action');

  let state = select()
  console.log(state, 'select');

  function p (cityId) {
    return fetch('https://baihuzi.com:5443/houses?cityId=' + cityId)
      .then(res => res.json())
      .then(data => { return data })
  }

  const effect = call(p, action.payload)
  console.log(effect, 'effect');
  const res = yield effect
  console.log(res);

  // const { data: res } = yield axios.get('https://baihuzi.com:5443/houses', { params: { cityId: action.payload } })
  // console.log(res);


  // 执行reducer
  let state1 = yield select()
  console.log(state1, 'select1');
  yield put({ type: 'getHouseListReducer', payload: res.body.list })


  function selector (state, index) {
    return state[index]
  }

  let state2 = yield select(selector, 0)
  console.log(state2, 'select2');
}


// watchSaga，对外面dispatch进行拦截，指定处理函数，并将action传给该函数
//! 这里takeEvery监听的action type 不能和 reducer里面的 action type 重名，否则不会经过work saga，直接就去执行reducer了 
function* watchSaga () {
  yield takeEvery('getHouseList', getHouseList)
}



//  --------- store -----------
const Reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case 'getHouseListReducer':
      return [...state, ...action.payload]
    default:
      return state;
  }
}

// 创建saga中间件
const sagaMid = createSagaMiddleware()

// 创建store，并应用saga中间件
const sagaStore = createStore(Reducer, applyMiddleware(sagaMid))

// saga必须在应用了中间件之后才能run，创建存储对象
sagaMid.run(watchSaga)

export default sagaStore