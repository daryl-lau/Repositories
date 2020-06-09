
import { CHANGE_AGE, CHANGE_NAME } from './mutation-types'

export default {

    // [CHANGE_AGE] 为es6语法，可以将表达式作为属性名
    // mutation接收两个参数，一个是state，用于修改状态，一个是payload，用于接收传参，payload大多数为一个对象，传递多个数据
    [CHANGE_AGE](state, payload) {
        console.log(payload);
        state.age = payload.age
    },

    [CHANGE_NAME](state, payload) {
        state.name = payload.name
    }
}