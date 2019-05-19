// 通过getters可以派生出来一些新的状态

export default {
    finishedCount(state) {
        /*    
         const count = (total, todo)=>{
                return total + (todo.finished ? 1 : 0)
            };
            return this.todos.reduce(count, 0); 
          */
        return state.todos.reduce(
            (total, todo) => total + (todo.finished ? 1 : 0),
            0
        );
    },
    totalCount(state) {
        return state.todos.length;
    },
    isCheckAll(state, getters) {
        return getters.finishedCount === getters.totalCount && getters.totalCount > 0
    }
}