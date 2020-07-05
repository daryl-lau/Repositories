export default {

    // 如果仅仅是区分了模块，而没有设置命名空间，那么getters,actions,mutations将会和根状态合并,外部直接获取，不需要加上命名空间
    // 在外面使用state时，通过 {{$store.state.users.username}} 获取，
    // 这里的users是根据new Vuex.Sotre({ modules: { users: users } }) 的key来指定的
    // 是否启用命名空间对模块内的state都没有影响，取值的方式还是上面这种方式，或者
    // ...mapState({
    //     tomRole: state => state.users.role,
    //     tomAge: state => state.users.age
    // }),

    // 命名空间只对getters，actions，和 mutations有影响，在外面获取时需要加上命名空间，如下
    // 如果使用命名空间，那么使用getters,actions,mutaions都需要使用命名空间的写法，state的使用方法多了一种，前面的方法仍然可用
    // [this.]$store.getters['account/isAdmin']   或  ...mapGetters('account', ['isAdmin'])
    // [this.]$store.dispatch('account/login')    或  ...mapActions('account', ['login'])
    // [this.]$store.commit('account/login')      或  ...mapMutations('account', ['login'])

    // 如果命名空间，则也可以使用 ...mapState('account', ['user']) 来获取，且上面的方式仍然可用

    namespaced: true,
    // 可以注意到state是一个函数返回了对象，避免自己和其他state数据互相污染，实际上和Vue组件内的data是同样的问题
    state() {
        return {
            username: 'Tom',
            role: 'admin',
            age: 20
        }
    },
    // 在这个模块的 getter 中，`getters` 被局部化了， 你可以使用 getter 的第四个参数来调用 `rootGetters`
    // 如果你希望使用全局 state 和 getter，rootState 和 rootGetters 会作为第三和第四参数传入 getter，
    // 也会通过 context 对象的属性传入 action。
    getters: {
        role(state, getters, rootState, rootGetters) {
            return state.role
        },
        allAge(state, getters, rootState, rootGetters) {
            return state.age + rootState.age
        }
    },
    // 对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState：
    actions: {
        change_role({ commit, rootState }) {
            commit('m_change_role')
        },

        // 在这个模块中， dispatch 和 commit 也被局部化了，他们可以接受 `root` 属性以访问根 dispatch 或 commit
        // 若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。
        someAction({ dispatch, commit, getters, rootGetters }) {
            getters.someGetter                                  // -> 'users/someGetter'
            rootGetters.someGetter                              // -> 'someGetter'

            dispatch('someOtherAction')                         // -> 'users/someOtherAction'
            dispatch('someOtherAction', null, { root: true })   // -> 'someOtherAction'

            commit('someMutation')                              // -> 'users/someMutation'
            commit('someMutation', null, { root: true })        // -> 'someMutation'
        },

        // 若需要在带命名空间的模块注册全局 action，你可添加 root: true，并将这个 action 的定义放在函数 handler 中。例如：
        globalAction: {
            root: true,
            handler(namespacedContext, payload) { }
        }
    },
    mutations: {
        m_change_role(state, payload) {
            state.role = 'vip'
        }
    }
}