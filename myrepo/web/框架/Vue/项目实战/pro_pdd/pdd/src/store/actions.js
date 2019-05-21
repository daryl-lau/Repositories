// 操作界面所有状态的异步方法

import {
    ADD_TODO,
    DEL_ITEM,
    DEL_FINISHED,
    IS_SELECT_ALL
} from './mutation-types'

export default {
    /* addTodo(todo) {
      this.todos.unshift(todo);
    },
    delItem(index) {
      this.todos.splice(index, 1);
    },
    delFinished() {
      // filter 不会改变原始数组，因此如果想要更改数组，需要将结果重新赋值
      this.todos = this.todos.filter(todo => {
        return todo.finished === false;
      });
    },
    isSelectedAll(isCheck) {
      this.todos.forEach(todo => {
        todo.finished = isCheck;
      });
    } */


    /* 
    将操作提交到mutations，中间通过mutation-types进行统一，这些都是固定写法；
    在外部调用方法时使用的是前面的addTodo，而不是ADD_TODO，也不是mutation-types中的add_todo
    */
    addTodo({ commit }, todo) {
        commit(ADD_TODO, { todo })
    },

    delItem({ commit }, index) {
        commit(DEL_ITEM, { index })
    },

    delFinished({ commit }) {
        commit(DEL_FINISHED)
    },

    isSelectedAll({ commit }, isCheck) {
        commit(IS_SELECT_ALL, { isCheck })
    }
}
