<template>
  <li @mouseenter="isShowBtn(true)" @mouseleave="isShowBtn(false)">
    <label>
      <input type="checkbox" v-model="todo.finished">
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-warning" v-show="showBtn" @click="delItemConfirm()">删除</button>
  </li>
</template>

<script>
// import {mapActions} from 'vuex'

export default {
  name: "Item",
  // 接收到上层传递的单个数据
  props: { todo: Object, index: Number },
  data() {
    return {
      showBtn: false
    };
  },
  /* computed:{
      ...mapActions(['delItem'])
  }, */
  methods: {
    isShowBtn(flag) {
      flag ? (this.showBtn = true) : (this.showBtn = false);
    },
    delItemConfirm() {
      if (window.confirm(`确定删除 "${this.todo.title}" 吗？`)){

        // 直接调用vuex中定义的delItem方法
        this.$store.dispatch("delItem", this.index);
      }
    }
  }
};
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /*display: none;*/
  /*margin-top: 3px;*/
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #e6e6e6;
}
</style>
