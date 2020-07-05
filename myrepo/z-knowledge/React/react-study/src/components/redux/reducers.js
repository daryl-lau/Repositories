import { combineReducers } from 'redux'


// 注意在dispatch action的时候，所有的reducer都会进行相应，如果reducer中有相同的action.type，则都会匹配执行

function user (state = { name: 'jerry', age: 18 }, action) {
    switch (action.type) {
        case 'change_user_name':
            return {
                ...state,
                name: action.name
            }
        case 'change_user_age':
            return {
                ...state,
                age: action.age
            }
        default:
            return state
    }
}

function company (state = { name: 'Alibaba' }, action) {
    switch (action.type) {
        case 'change_com_name':
            return {
                ...state,
                name: action.name
            }
        default:
            return state
    }
}

const reducers = combineReducers({
    user,
    company
})

export default reducers