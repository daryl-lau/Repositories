import {call, put, takeEvery} from 'redux-saga/effects';

let api = function () {
    
};

// work saga
// generator函数
function* login() {
    try {
        const result = yield call(api.login);

        // reducer action
        yield put({type: 'login', result})
    } catch (e) {
        yield put({type: 'login_fail', message: e.message});
    }
}

// generator函数
function* mySaga() {
    yield takeEvery('login_request', login)
}

export default mySaga;