<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheck">
    </label>
    <span>
      <span>已完成{{finishedCount}}件</span>
      / 总计{{totalCount}}件
    </span>
    <button class="btn btn-warning" @click="$store.dispatch('delFinished')">清除已完成任务</button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Footer",
  props: {
    todos: Array,
    delFinished: Function,
    isSelectedAll: Function
  },
  methods: {
    /* 
      使用函数进行统计已完成的任务，调用时需要加()
      countFinished(){
        let count = 0;
        for (var i=0; i<this.todos.length; i++){
          if (this.todos[i].finished){
            count += 1
          } else {
            count += 0
          }
        }
        return count
      } 
      */
  },
  computed: {
    // 使用计算属性进行统计已完成的任务，调用时不需要加()
    /* finishedCount() {
         
      //  const count = (total, todo)=>{
      //         return total + (todo.finished ? 1 : 0)
      //     };
      //     return this.todos.reduce(count, 0); 
       
      return this.todos.reduce(
        (total, todo) => total + (todo.finished ? 1 : 0),
        0
      );
    }, */

    ...mapGetters(['finishedCount','totalCount']),
    isCheck: {
      // get() {
      //   return (
      //     this.finishedCount === this.todos.length && this.todos.length > 0
      //   );
      // },
      get (){
        return this.$store.getters.isCheckAll
      },
      set(value) {
        this.$store.dispatch('isSelectedAll', value);
      }
    }
  }
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
