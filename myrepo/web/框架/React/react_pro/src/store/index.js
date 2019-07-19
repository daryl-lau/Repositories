
import {createStore, combineReducers} from 'redux';

import users from './users';
import company from './company'

let reducers = combineReducers({
    users,
    company
});

// 3、创建存储对象
export default createStore(reducers);