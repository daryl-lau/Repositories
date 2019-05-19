// 异步转同步，获取actions提交的状态,进行同步处理


import { ADD_TODO, DEL_ITEM, DEL_FINISHED, IS_SELECT_ALL } from './mutation-types'

export default {
    [ADD_TODO](state, { todo }) {
        state.todos.unshift(todo);
    },
    [DEL_ITEM](state, { index }) {
        state.todos.splice(index, 1);
    },
    [DEL_FINISHED](state) {
        state.todos = state.todos.filter(todo => {
            return todo.finished === false;
        });
    },
    [IS_SELECT_ALL](state, { isCheck }) {
        state.todos.forEach(todo => {
            todo.finished = isCheck;
        });
    }
}