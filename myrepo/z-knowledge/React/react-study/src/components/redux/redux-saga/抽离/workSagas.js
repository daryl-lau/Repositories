import { call, put, select } from 'redux-saga/effects'
import { addList } from './actions'

function* sagaAddList ({ payload }) {
  console.log(payload);

  function f (arg) {
    console.log(arg);
    return fetch('https://baihuzi.com:5443/home/swiper').then(d => d.json())
  }

  // let res = yield call(f, 'params')
  // console.log(res);


  // let p = function () {
  //   return new Promise(resolve => {
  //     setTimeout(resolve, 2000)
  //   })
  // }
  // yield call(p)

  // function selector (state) {
  //   return state
  // }
  // let beforeState = yield select(selector)
  // console.log(beforeState);

  yield put(addList(payload))

  // let afterState = yield select()
  // console.log(afterState);

  // console.log('end');
}



function* sagaTest ({ payload }) {
  console.log('test');
}


export {
  sagaAddList,
  sagaTest
}