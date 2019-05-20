<template>
  <li @mouseenter="isShowBtn(true)" @mouseleave="isShowBtn(false)">
    <label>
      <input type="checkbox" v-model="todo.finished">
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-warning" v-show="showBtn" @click="delItem(index)">删除</button>
  </li>
</template>

<script>
export default {
    name: 'Item',
    props: { todo: Object, index: Number, delItem: Function },
    data() {
        return {
            showBtn: false
        }
    },
    methods: {
        isShowBtn(flag) {
            flag ? (this.showBtn = true) : (this.showBtn = false)
        }
    }
}
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
