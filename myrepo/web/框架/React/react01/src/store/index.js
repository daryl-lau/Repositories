
import {createStore, combineReducers, applyMiddleware} from 'redux';

import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import users from './users';
import company from './company'
import mySaga from '../components/sagas'



const sagaMid = createSagaMiddleware();



let reducers = combineReducers({
    users,
    company
});

const store = createStore(reducers, applyMiddleware(logger, sagaMid));

// 3、创建存储对象

sagaMid.run(mySaga);

export default store