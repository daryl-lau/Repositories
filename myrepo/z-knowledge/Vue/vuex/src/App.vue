<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <hr />
    {{name}}
    <br />
    {{age}}
    <br />
    <button @click="changeAge()">修改年龄</button>
    <br />
    <button @click="changeName()">修改名字</button>
    <br />
    <p>getters应用</p>
    {{$store.getters.addSuffix}}
    <br />
    {{$store.getters.addPrefix}}
    <hr />
    <h3>模块化状态</h3>
    {{$store.state.users.username}}
    {{$store.state.users.role}}
    <br />
    {{$store.getters['users/role']}}
    <br />
    {{usersName}}
    <br />
    {{role}}
    {{tomAge}}
    {{tomRole}}
    <br />
    allAge:{{allAge}}
    <br />
    <button @click="changeRole()">改变角色</button>
    <button @click="changeRoleByMutation()">mutation改变角色</button>
  </div>
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
// mapState的第一个参数是命名空间，字符串，结合modules使用，可省略
// 第二个参数可以是一个数组或者对象
import { mapState } from 'vuex'

// 使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。
import { mapMutations } from 'vuex'

// 导入mapActions辅助函数
import { mapActions } from 'vuex'

// 导入mapGetters辅助函数
import { mapGetters } from 'vuex'

// mutation和action都是在methods里面接收，而state和getters是在computed里面

export default {
  name: 'App',
  data() {
    return {
      localCount: 999,
    }
  },
  computed: {
    // ---------------------------------------state------------------------------------------------------------
    // 获取state在计算属性中获取，返回的状态当做计算属性来渲染到界面
    // 并且当state里面的属性发生更改时，界面会自动响应式的进行更改

    // 可以传入数组，此时的计算属性名称和state属性名是相同的，推荐这种写法，简单明了
    ...mapState(['name', 'age']),

    // 带命名空间的写法，推荐这种写法，简单明了，如果有嵌套层级，直接在第一个参数使用'/'进行分级
    // 这里users是在store中的modules 对象中的key值
    ...mapState('users', ['role']),

    // 使用计算属性获取模块里的state，users是模块名，username是state
    // 下面这两种方式对于是不是启用了命名空间没有影响
    usersName() {
      return this.$store.state.users.username
    },

    // 使用mapState获取模块里的state， users是模块名，role和age是里面的state
    ...mapState({
      tomRole: (state) => state.users.role,
      tomAge: (state) => state.users.age,
    }),

    // 如果传入对象，必须定义一个计算属性名称，不能使用ES6的{name， age}的省略写法，否则报错
    // ...mapState({
    //     myName: 'name',
    //     myAge: 'age'
    // })

    // 当不使用mapState辅助函数的时候，直接定义计算属性，使用this.$store.state获取状态，如果很多状态，这样写代码十分冗余
    // 但是如果需要拿到状态和本地数据进行结合，这样写是很方便的，（无法使用过滤器，过滤器中无法访问实例this）
    // name() {
    //     return this.$store.state.name
    // },
    // age() {
    //     return this.$store.state.age + this.localCount
    // }
    // ---------------------------------------state------------------------------------------------------------

    // ---------------------------------------getters------------------------------------------------------------
    ...mapGetters(['addSuffix', 'addPrefix']),

    // 带命名空间的写法
    ...mapGetters('users', ['allAge']),

    allAge() {
      return this.$store.getters['users/allAge']
    },

    // ...mapGetters({
    //     suffix: 'addSuffix',
    //     prefix: 'addPrefix'
    // })

    // 不使用mapGetters辅助函数，可以直接使用this.$store.getters.xxx来访问
    // 例如上面的模板中
    // {{$store.getters.addSuffix}}
    // {{$store.getters.addPrefix}}

    // prefix(){
    //     return this.$store.getters.addPrefix
    // }

    // ---------------------------------------getters------------------------------------------------------------
  },
  methods: {
    // ---------------------------------------mutation------------------------------------------------------------

    // mutation里的操作都是同步的，异步操作放在action中执行
    // 如果没有异步操作，可以不经过action，直接提交mutation，否则则需要通过action，由action提交mutation

    ...mapMutations(['change_age']), // 将 `this.change_age()` 映射为 `this.$store.commit('change_age')`

    // 带命名空间的写法
    ...mapMutations('users', ['m_change_role']),

    changeRoleByMutation() {
      this.m_change_role()
    },

    // ...mapMutations({
    //     change: 'change_age' // 将 `this.change()` 映射为 `this.$store.commit('change_age')，相当于取了个别名
    // }),

    // 无论哪种方式，都可以传一个payload，
    // 即将 `this.change_age(payload)` 映射为 `this.$store.commit('change_age', payload)`

    changeAge() {
      // 如果使用...mapMutations拿到了mutation，则可以直接使用this.xxx提交mutation
      this.change_age({ age: 20 })

      // 如果使用的对象形式拿到了mutation，则使用this.属性名 来提交mutation
      // this.change()

      // 如果没有使用mapMutations，则需要使用this.$store.commit('xxx',payload)提交mutation
      // this.$store.commit('change_age', { age: 20 })

      // 提交的方式可以像上面那种方式，也可以直接提交一个对象，但是对象中必须要有type属性来声明mutation
      // this.$store.commit({
      //     type: 'change_age',
      //     age: 20
      // })
    },
    // ---------------------------------------mutation------------------------------------------------------------

    // ----------------------------------------actios-------------------------------------------------------------

    ...mapActions(['change_name']),

    changeName() {
      this.change_name({ name: 'tom' })

      // 和mutation一样，不使用mapActions辅助函数的话，可以使用dispatch的方式this.$store.dispatch('xxx', payload)
      // this.$store.dispatch('change_name', { name: 'tom' })

      // this.$store.dispatch({
      //     type: 'change_name',
      //     name: 'tom'
      // })
    },

    ...mapActions('users', ['change_role']),
    // ...mapActions(['users/change_role']), // 不要使用这种方式，获取不到，上面那种方式可以获取到

    changeRole() {
      this.change_role()
      // this.$store.dispatch('users/change_role')
    },

    // ----------------------------------------actios-------------------------------------------------------------
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
