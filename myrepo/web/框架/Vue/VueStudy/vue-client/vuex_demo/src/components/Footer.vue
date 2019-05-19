<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheck">
    </label>
    <span>
      <span>已完成{{finishedCount}}件</span>
      / 总计{{totalCount}}件
    </span>
    <!-- 在标签中直接调用vuex方法，不需要加this，直接$store.dispatch()调用 -->
    <button class="btn btn-warning" @click="$store.dispatch('delFinished')">清除已完成任务</button>
  </div>
</template>

<script>
// 引入getters方法，然后进行解构赋值
import { mapGetters } from "vuex";

export default {
  name: "Footer",
  props: {
    todos: Array,
    delFinished: Function,
    isSelectedAll: Function
  },
  computed: {
    // 注意解构赋值之前需要先引入
    ...mapGetters(["finishedCount", "totalCount"]),
    isCheck: {
      get() {
        return this.$store.getters.isCheckAll;
      },
      set(value) {
        this.$store.dispatch("isSelectedAll", value);
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
