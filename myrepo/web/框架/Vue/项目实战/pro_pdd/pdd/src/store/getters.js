// 通过getters可以派生出来一些新的状态，可以理解为获取到数据然后进行二次处理

export default {
    // 计算已完成任务的总数
    finishedCount(state) {
        return state.todos.reduce(
            (total, todo) => total + (todo.finished ? 1 : 0),
            0
        );
    },
    // 计算任务总是
    totalCount(state) {
        return state.todos.length;
    },
    // 计算是否全部选中，返回布尔值
    // 调用getters中自身的方法，传入getters，然后通过 getters.xxxxx 直接调用
    isCheckAll(state, getters) {
        return getters.finishedCount === getters.totalCount && getters.totalCount > 0;
    }
};