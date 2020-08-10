class myVue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    this.observe(this.$data)

    new Compile(this.$el, this)
  }

  observe (obj) {
    Object.keys(obj).forEach(key => {
      this.defineReactive(obj, key, obj[key])
    })
  }

  defineReactive (obj, key, value) {
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      get () {
        console.log('get');
        Dep.target && dep.addDep(Dep.target)
        return value
        // return obj[key]    // 这里不能直接用obj[key] 返回，会造成一直死循环的get
      },
      set (newVal) {
        console.log('set');
        if (value === newVal) return
        value = newVal
        dep.notify()
      }
    })
  }
}

class Dep {
  constructor() {
    this.deps = []
  }

  addDep (dep) {
    this.deps.push(dep)
  }

  notify () {
    this.deps.forEach(dep => {
      dep.update()
    })
  }
}

class Watcher {
  constructor(vm, exp, callback) {
    this.vm = vm
    this.exp = exp
    this.callback = callback
    Dep.target = this
    this.vm.$data[this.exp]
    Dep.target = null
  }
  update () {
    this.callback.call(this.vm, this.vm[this.exp])
  }
}

class Compile {
  constructor(el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm

    this.$fragment = this.node2Fragment(this.$el)
    this.compileTemplate(this.$fragment)
    this.$el.appendChild(this.$fragment)
  }

  node2Fragment (node) {
    let fragment = document.createDocumentFragment()

    // Array.from(node.childNodes).forEach(item => {
    //   fragment.appendChild(item)
    // })

    let child
    while (child = node.firstChild) {
      fragment.appendChild(child)
    }
    console.log(fragment);
    return fragment
  }

  compileTemplate (fragment) {
    let childNodes = fragment.childNodes
    let reg = /\{\{(.*)\}\}/

    Array.from(childNodes).forEach(node => {
      // 元素
      if (node.nodeType === 1) {
        console.log(node, 1111);

        // 是元素，获取arrtibutes
        let attrs = node.attributes
        console.log(attrs);
        Array.from(attrs).forEach(attr => {
          let name = attr.name    // v-text="xxx"   v-text
          let exp = attr.value    // xxx
          console.log(name, exp);
          if (name.startsWith('v-')) {
            let dir = name.substring(2) // text
            console.log(dir, 'dir');
            // this[dir + 'Updator'] && this[dir + 'Updator'](node, this.$vm.$data[exp])
            this.update(node, this.$vm, exp, dir)
          }
        })
      }
      // 文本
      if (node.nodeType === 3 && reg.test(node.textContent)) {
        let exp = RegExp.$1
        console.log(exp, 'eeeeeeeeeeeeeexp');
        this.update(node, this.$vm, exp, 'text')
      }

      // 递归子节点
      if (node.children && node.childNodes.length > 0) {
        this.compileTemplate(node)
      };
    })
  }
  textUpdator (node, value) {
    node.textContent = value
  }
  htmlUpdator (node, value) {
    node.innerHTML = value
  }

  update (node, vm, exp, dir) {
    let updator = this[dir + 'Updator']
    updator && updator(node, vm.$data[exp])

    new Watcher(vm, exp, function (newVal) {
      updator && updator(node, vm.$data[exp])
    })
  }
}