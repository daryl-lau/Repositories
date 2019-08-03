
import {createStore, combineReducers, applyMiddleware} from 'redux';

import logger from 'redux-logger'
import trunk from 'redux-thunk'

import users from './users';
import company from './company'

let reducers = combineReducers({
    users,
    company
});

// 3、创建存储对象
// export default createStore(reducers);
export default createStore(reducers, applyMiddleware(logger,trunk));