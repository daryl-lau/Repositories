<template>
  <ul class="todo-main">
    <!--  todos是从state中直接拿到的，将获取到的数据进行for循环，然后将每一条数据传递给下层，即todo、index，key仅作为每个item的独立标识，下层并没有接收  -->
    <Item v-for="(todo, index) in todos" :todo="todo" :index="index" :key="index"></Item>
  </ul>
</template>

<script>
// 引入组件
import Item from './Item'

// 引入状态，需要数据时，不用上层传递，直接到state中去拿
import { mapState } from 'vuex'

export default {
    name: 'List',
    components: {
        Item
    },

    // 需要数据时，不用上层传递，直接到state中去拿，需要写在computed属性中
    computed: {
        ...mapState(['todos', 'Author'])
    }
    // props: {todos:Array, delItem:Function}
}
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
