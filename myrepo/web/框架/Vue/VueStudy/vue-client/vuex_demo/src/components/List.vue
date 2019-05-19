<template>
  <ul class="todo-main">
    <Item v-for="(todo, index) in todos" :todo="todo" :index="index" :key="index"></Item>
  </ul>
</template>

<script>
// 引入组件
import Item from "./Item";

// 引入状态
import { mapState } from "vuex";

export default {
  name: "List",
  components: {
    Item
  },
  computed: {
    ...mapState(['todos'])
  }
  // props: {todos:Array, delItem:Function}
};
</script>

<style scoped>
.todo-main {
  margin-left: 0;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
