import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMidware from 'redux-saga'

import reducers from './reducers'

import watchSagas from './watchSagas'


let saga = createSagaMidware()
let store = createStore(combineReducers(reducers), applyMiddleware(saga))


for (let key in watchSagas) {
  saga.run(watchSagas[key])
}

export default store