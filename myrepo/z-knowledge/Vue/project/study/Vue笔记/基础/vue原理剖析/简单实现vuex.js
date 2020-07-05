let Vue

function install(_Vue) {
    Vue = _Vue;

    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}


class Store {
    // options: {state:{}, actions:{}, mutations:{} ... }
    constructor(options = {}) {

        // 利用Vue管理动态的数据
        this.state = new Vue({
            data: options.state
        })

        // 初始化mutations
        this.mutations = options.mutations || {}
        this.actions = options.actions || {}

        options.gettets && this.handleGetters(options.getters)
    }

    // 需要实现commit
    commit = (type, args) => {
        // this指向 store 实例
        this.mutations[type](this.state, args)
    }

    dispatch = (type, args) => {
        return this.actions[type]({ commit: this.commit, state: this.state }, args)
    }

    handleGetters(getters) { 
        this.getters = {}

        // 定义只读的属性
        Object.keys(getters).forEach(key => { 
            Object.defineProperty(this.getters, key, {
                get: () => { 
                    return getters[key](this.state)
                }
            })
        })
    }
}

export default { Store, install }