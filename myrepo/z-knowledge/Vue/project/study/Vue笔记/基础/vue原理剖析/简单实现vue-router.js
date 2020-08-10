// 主要思路
// 1、要能解析routed的配置，变成一个key为path，value为component的map
// 2、要能监控url的变化事件，把最新的hash值保存到current路由
// 3、要定义两个全局组件，router-link用于修改hash，router-view用于显示匹配组件的内容
// 4、current 应该是响应式的，这样可以触发router-view的重新渲染

let Vue

// Usage:

// Vue.use(VueRouter)

// let router = new VueRouter({
//     routes: [
//         {path: '/news', component: News}
//     ]
// })

// new Vue({
//  el: '#root',
//  router
// })

class VueRouter {
    constructor(options) {
        this.$options = options

        // 创建一个路由path和route映射
        this.app = new Vue({
            data: {
                current: '/'
            }
        })
    }

    init () {
        // 绑定浏览器事件
        this.bindEvents();

        // 解析路由配置
        this.createRouteMap(this.$options)

        // 创建router-link和router-view
        this.iniComponent()
    }

    bindEvents () {
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        window.addEventListener('load', this.onHashChange.bind(this))
    }

    onHashChange () {
        this.app.current = window.location.hash.slice(1) || '/'
    }

    createRouteMap (options) {
        options.routes.forEach(item => {
            this.routeMap[item.path] = item
        })
    }

    iniComponent () {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render (h) {
                return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
            }
        })

        Vue.component('router-view', {
            // 这里使用箭头函数，this指向的是VurRouter实例
            render: h => {
                return h(this.routeMap[this.app.current].component)
            }
        })
    }
}

// 把VueRouter变为插件，Vue.use(VueRouter)
// 把下面的低吗混入到Vue的声明周期里面去，创建Vue实例的时候就会执行下面的代码，当检测到有router配置的时候，就初始化init
VueRouter.install = function (_Vue) {
    Vue = _Vue; // 这里保存，上面使用

    Vue.mixin({
        beforeCreate () {
            // 这里的代码将会在外面初始化的时候被调用
            // 这样我们就实现了Vue的扩展
            // this这里指向的是Vue组件实例
            // 但是这里只希望根组件执行一次，因此判断是否具有router option
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
                this.$options.router.init();    // 这里的router已经是new VueRouter出来的实例对象了，可以调用上面的init方法
            }
        }
    })
}