import { takeEvery, call, put } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'

// work saga---------------saga-----------
function* getHouseList (action) {
  console.log(action, 'action');

  function p () {
    return fetch('https://baihuzi.com:5443/houses?cityId=AREA%7Cdbf46d32-7e76-1196&start=21&end=40')
      .then(res => res.json())
      .then(data => { return data })
  }

  const res = yield call(p)
  console.log(res);

  // 执行reducer
  yield put({ type: 'getHouseListReducer', payload: res.body.list })
}


// watchSaga
function* watchSaga () {
  yield takeEvery('getHouseList', getHouseList)
}



//  --------- store -----------
const sagaReducer = (state = [], action) => {
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
const sagaStore = createStore(sagaReducer, applyMiddleware(sagaMid))

// saga必须在应用了中间件之后才能run，创建存储对象
sagaMid.run(watchSaga)

export default sagaStore