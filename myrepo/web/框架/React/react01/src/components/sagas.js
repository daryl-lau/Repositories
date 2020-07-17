import { call, put, takeEvery } from 'redux-saga/effects';

let api = function () {

};

// work saga
// generator函数
function* login () {
    try {

        // 异步操作使用call调用
        const result = yield call(api.login);

        // reducer action，状态更新使用put
        yield put({ type: 'login', result })
    } catch (e) {
        yield put({ type: 'login_fail', message: e.message });
    }
}

// generator函数
function* mySaga () {

    // 外界
    yield takeEvery('login_request', login)
}

export default mySaga;