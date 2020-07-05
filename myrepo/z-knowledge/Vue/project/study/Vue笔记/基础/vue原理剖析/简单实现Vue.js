
// 定义构造函数

class myVue {
    constructor(options) {
        // 保存选项
        this.$options = options

        // 传入的data
        this.$data = options.data

        // 响应式处理
        this.observe(this.$data)

        // 测试Watcher
        // new Watcher(this, 'name')
        // this.name

        new Compile(options.el, this)

        // created生命周期
        if (options.created) {
            options.created.call(this)
        }
    }

    observe(obj) {
        if (!obj || typeof obj !== 'object') {
            return
        }

        // 遍历
        Object.keys(obj).forEach(key => {
            this.defineReactive(obj, key, obj[key])

            // 代理data中的属性到vue实例上， 这样就可以直接使用vm.name 来访问属性，而不需要使用vm.$data.name来访问
            this.proxyData(key)
        })

    }

    defineReactive(obj, key, value) {

        // 每个dep实例和data中每个key有一对一关系
        const dep = new Dep()

        // 给obj的每个key定义属性
        Object.defineProperty(obj, key, {
            get() {

                // 当new 一个 Watcher的时候，都会
                Dep.target && dep.addDep(Dep.target)

                return value
            },
            set(newValue) {
                if (value !== newValue) {
                    value = newValue

                    // 不能使用下面这种写法，因为value值没变，会导致判断永远成立，导致死循环
                    // this[key] = newValue

                    // 如果key修改了，即通知dep中的所有Watcher更新
                    dep.notify()

                    // console.log(key + '属性更新了');
                }
            }
        })

        // 递归遍历
        this.observe(value)
    }

    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newValue) {
                this.$data[key] = newValue
            }
        })
    }
}



// 创建Dep类，用来管理所有的Watcher
// 每一个key都只会有一个dep，
// 但在页面中会有多个重复的key，在编译模板的时候，会new出多个Watcher
// 此时把这些Watcher放到这个key对应的dep中，当其中一个key发生变化，就通知该dep中的所有Watcher都进行update更新
class Dep {
    constructor() {
        // 存储所有的依赖
        this.watchers = []
    }

    // 这里的dep就是Watcher实例
    addDep(watcher) {
        this.watchers.push(watcher)
    }

    notify() {
        this.watchers.forEach(watcher => watcher.update())
    }

}


// 创建Watcher，保存data中的数值和页面的挂钩关系
// 会先解析模板，把每个响应式的数据都new成一个Watcher
class Watcher {
    // vm即myVue的实例，key是相关联的key，即data中的哪个key
    constructor(vm, key, cb) {

        // 创建Watcher实例时，立刻将该Watcher实例指向Dep.target 便于依赖收集
        Dep.target = this
        this.vm = vm
        this.key = key
        this.cb = cb

        // 触发依赖收集
        this.vm[this.key]   // 触发依赖收集
        Dep.target = null
    }

    // 更新dom
    update() {
        // console.log(this.key + '更新了！');
        this.cb.call(this.vm, this.vm[this.key])
    }
}


