
import { CHANGE_AGE, CHANGE_NAME } from './mutation-types'

export default {

    // Action 函数第一个参数是一个与 store 实例具有相同方法和属性的 context 对象，
    // 因此你可以调用 context.commit 提交一个 mutation，
    // 或者通过 context.state 和 context.getters 来获取 state 和 getters。
    // 通过解构来简化代码

    // 第二个参数是payload，用于接收数据，通常为一个对象，用于接收多个数据，也可以直接接受单个参数
    change_name({ commit }, payload) {
        commit(CHANGE_NAME, payload)
    },

    // 最后，如果我们利用 async / await，我们可以如下组合 action，在action中调用另外一个action

    // 假设 getData() 和 getOtherData() 返回的是 Promise
    // async actionA({ commit }) {
    //     commit('gotData', await getData())
    // },
    // async actionB({ dispatch, commit }) {
    //     await dispatch('actionA') // 等待 actionA 完成
    //     commit('gotOtherData', await getOtherData())
    // }

}