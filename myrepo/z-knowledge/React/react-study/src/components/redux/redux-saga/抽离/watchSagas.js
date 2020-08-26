import { takeEvery, takeLatest, takeLeading } from 'redux-saga/effects'

import { sagaAddList, sagaTest } from './workSagas'

function* watchSaga () {
  yield takeEvery('sagaAddList', sagaAddList)
}

function* watchTest () {
  yield takeEvery('sagaTest', sagaTest)
}

export default {
  watchSaga,
  watchTest
}