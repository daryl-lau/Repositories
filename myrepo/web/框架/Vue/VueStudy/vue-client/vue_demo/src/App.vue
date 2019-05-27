<template>
    <wtb
        :tabList="tabList"
        :tabBarStyle="tabBarStyle"
        :listItemStyle="listItemStyle"
        :moveTagStyle="moveTagStyle"
        :dragWhiteSpace="dragWhiteSpace"
        :activeFontColor="activeFontColor"
        :noActiveFontColor="noActiveFontColor"
        @change="change"
    ></wtb>
    <!--  <div class="todo-container">-->
    <!--    <div class="todo-wrap">-->
    <!--      <Input :addTodo="addTodo"></Input>-->
    <!--      <List :todos="todos" :delItem="delItem"></List>-->
    <!--      <Footer :todos="todos" :delFinished="delFinished" :isSelectedAll="isSelectedAll"></Footer>-->
    <!--    </div>-->
    <!--  </div>-->
</template>

<script>
    import Footer from './components/Footer'
    import Input from './components/Input'
    import List from './components/List'

    // import wrapTabBar from './components/topTabBar/wrapTabBar'

    export default {
        name: 'App1',
        components: {
            Footer,
            Input,
            List,
        },
        // data() {
        //     return {
        //         todos: [
        //             { title: '学习Linux', finished: true },
        //             { title: '学习Oracle', finished: false },
        //             { title: '学习Oracle', finished: false },
        //             { title: '学习Oracle', finished: false },
        //             { title: '学习Python', finished: true },
        //             { title: '学习Vue', finished: false },
        //             { title: '学习JavaScript', finished: false }
        //         ]
        //     }
        // },
        data() {
            return {
                tabList: [
                    {title: 'DataBase', isActive: true},
                    {title: 'Oracle', isActive: false},
                    {title: 'MySQL', isActive: false},
                    {title: 'MongoDB', isActive: false},
                    {title: 'Redis', isActive: false},
                    {title: 'Linux', isActive: false},
                    {title: 'shell', isActive: false},
                    {title: 'bash', isActive: false},
                    {title: '网络', isActive: false},
                    {title: 'HCIE', isActive: false},
                    {title: 'Cisco', isActive: false},
                    {title: 'Python', isActive: false},
                    {title: 'RedHat', isActive: false},
                    {title: 'CentOS', isActive: false},
                    {title: 'Docker', isActive: false},
                ],
                tabBarStyle: {backgroundColor: ''},
                listItemStyle: {width: 70, height: 50, fontSize: 12, fontColor: '#6c6c6c'},
                moveTagStyle: {display: true, width: 30, height: 2, offsetBottom: 5, color: 'skyblue'},
                dragWhiteSpace: 100,
                activeFontColor: {color: 'skyblue'},
                noActiveFontColor: {color: '#6c6c6c'}
            }
        },
        methods: {
            addTodo(todo) {
                this.todos.unshift(todo)
            },
            delItem(index) {
                this.todos.splice(index, 1)
            },
            delFinished() {
                // filter 不会改变原始数组，因此如果想要更改数组，需要将结果重新赋值
                this.todos = this.todos.filter(todo => {
                    return todo.finished === false;
                })
            },
            isSelectedAll(isCheck) {
                this.todos.forEach(todo => {
                    todo.finished = isCheck
                })
            },
            change(index){
                console.log(index);
            }
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
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
        0 1px 2px rgba(0, 0, 0, 0.05);
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
