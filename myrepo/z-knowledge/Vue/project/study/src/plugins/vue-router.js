// 主要思路
// 1、要能解析routed的配置，变成一个key为path，value为component的map
// 2、要能监控url的变化事件，把最新的hash值保存到current路由
// 3、要定义两个全局组件，router-link用于修改hash，router-view用于显示匹配组件的内容
// 4、current应该是响应式的，这样可以触发router-view的重新渲染

let Vue

class MyRouter {
  constructor (options) {
    this.$options = options

    // 创建一个路由到组件的映射
    this.routeMap = {}

    // 创建一个路由path和route映射
    // 利用Vue data本身的数据动态绑定，监听路由的变化
    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }

  init () {
    // 绑定浏览器事件
    this.bindEvents()

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
    // 获取到 http://xxx.com/#/home  hash的值  #/home  => /home
    this.app.current = window.location.hash.slice(1) || '/'

    console.log(this.app.current)
  }

  createRouteMap (options) {
    console.log(options)
    options.routes.forEach(item => {
      //  把路由映射成为这种格式
      //  只是简单的处理了一级路由
      /*
                routes: [
                    {path: "/home", component: {…}}
                    {path: "/user", component: {…}}
                ]
                =======>
                {
                    '/home': {path: "/home", component: {…}}
                    '/user': {path: "/user", component: {…}}
                }

            */
      this.routeMap[item.path] = item
    })

    console.log(this.routeMap)
  }

  iniComponent () {
    Vue.component('router-link', {
      props: {
        to: String
      },

      // 使用function函数，this指向的是Vue实例
      // this.$slots.default拿到的是 <router-link>default</router-link> 中的 default
      // 渲染目标 <a :href='to'>default</a>
      render (h) {
        return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)

        // JSX
        // return <a href={this.to}>{this.$slots.default}</a>
      }
    })

    Vue.component('router-view', {

      // 这里使用箭头函数，this指向的是MyRouter实例
      render: h => {
        // 这里拿到路由组件直接进行渲染
        // this.app.current一旦被修改，就重新渲染相应组件
        return h(this.routeMap[this.app.current].component)
      }
    })
  }
}

// 把MyRouter变为插件， 在外面Vue.use(MyRouter)的时候，就会执行这里install里面的代码
MyRouter.install = function (_Vue) {
  Vue = _Vue // 这里保存，上面使用

  Vue.mixin({
    beforeCreate () {
      // 这里的代码将会在外面初始化的时候被调用
      // 这样我们就实现了Vue的扩展
      // this这里指向的是Vue组件实例
      // 但是这里只希望根组件执行一次，因此判断是否具有router option
      if (this.$options.router) {
        // 这句代码的意思是拿到router实例，这个router实际上是自己new 出来的路由实例
        /*
                    const router = new MyRouter({
                        routes: [],
                        xxx: '',
                        ...
                    })

                    new Vue({
                        router
                    })
                */
        // 因此这里的this.$options.router 就是这里的构造函数实例化的对象
        Vue.prototype.$router = this.$options.router

        // 调用init()方法
        this.$options.router.init()
      }
    }
  })
}

export default MyRouter
