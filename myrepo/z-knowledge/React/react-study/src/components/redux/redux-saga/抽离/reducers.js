import { ADD_LIST } from './action-types'

let listData = ['1', '2', '3', '4', '5']
const list = (state = listData, action) => {
  switch (action.type) {
    case ADD_LIST:
      return [...state, ...action.payload]
    default:
      return state
  }
}

const test = (state = { test: 'test' }, action) => {
  switch (action.type) {
    case "addTest":
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default {
  list,
  test
}