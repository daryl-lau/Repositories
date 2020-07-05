import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { change_user_age, change_company,changeComAsync } from './actions'


let store = createStore(reducers, applyMiddleware(thunk, logger))

console.log(store.getState());

store.dispatch({ type: 'change_user_name', name: 'tom' })
store.dispatch(change_user_age)
store.dispatch(change_company('Baidu'))
store.dispatch(changeComAsync())

export default store