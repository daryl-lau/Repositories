export default {
    // getter可认为是state的计算属性

    // getter将state作为第一个参数
    addSuffix(state) {
        return state.age + '岁'
    },

    // getter也可将getters作为第二个参数，用来调用其他getter
    addPrefix(state, getters) {
        return '今年' + getters.addSuffix
    }
}