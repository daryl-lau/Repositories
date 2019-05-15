<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox"/>
    </label>
    <span>
          <span>已完成0件</span> / 总计{{todos.length}}件
        </span>
    <button class="btn btn-warning">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    name: "Footer",
    props: {
      todos:Array
    }
  }
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
