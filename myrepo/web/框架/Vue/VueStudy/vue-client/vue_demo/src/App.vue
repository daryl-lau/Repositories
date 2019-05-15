<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Input></Input>
      <List :todos="todos"></List>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>

  import Footer from './components/Footer';
  import Input from './components/Input';
  import List from './components/List'

  export default {
    name: 'App1',
    components: {
      Footer,
      Input,
      List
    },
    data() {
      return {todos:[
        {title:'学习Linux', finished:false},
        {title:'学习Oracle', finished:false},
        {title:'学习Python', finished:false},
        {title:'学习Vue', finished:false},
        {title:'学习JavaScript', finished:false}
      ]}
    }
  }
</script>

<style>
  /*app*/
  body {
    background: #fff;
  }

  .btn {
    display: inline-block;
    padding: 8px 10px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  .btn-warning {
    color: #fff;
    background-color: orange;
    border: none;
  }

  .btn-warning:hover {
    color: #fff;
    background-color: red;
  }

  .btn:focus {
    outline: none;
  }

  .todo-container {
    width: 600px;
    margin: 0 auto;
  }

  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
