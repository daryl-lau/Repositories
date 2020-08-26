import { takeEvery, call, put, fork, select } from 'redux-saga/effects'
import createSageMidware from 'redux-saga'

import { createStore, applyMiddleware, combineReducers } from 'redux'

let listData = ['1', '2', '3', '4', '5']
const list = (state = listData, action) => {
  switch (action.type) {
    case "addList":
      return [...state, ...action.payload]
    default:
      return state
  }
}

const test = (state = { test: 'test' }, action) => {
  switch (action.type) {
    case "addTest":
      return { ...state, ...action.payload }
    default:
      return state
  }
}



function* sagaAddList ({ payload }) {
  console.log(payload);

  function f (arg) {
    console.log(arg);
    return fetch('https://baihuzi.com:5443/home/swiper').then(d => d.json())
  }

  let res = yield call(f, 'params')
  console.log(res);


  let p = function () {
    return new Promise(resolve => {
      setTimeout(resolve, 2000)
    })
  }
  yield call(p)

  function selector (state) {
    return state
  }
  let beforeState = yield select(selector)
  console.log(beforeState);

  yield put({ type: 'addList', payload })

  let afterState = yield select()
  console.log(afterState);

  console.log('end');
}

function* watchSaga () {
  yield takeEvery('sagaAddList', sagaAddList)
}




let saga = createSageMidware()
let store = createStore(combineReducers({ list, test }), applyMiddleware(saga))

saga.run(watchSaga)

export default store