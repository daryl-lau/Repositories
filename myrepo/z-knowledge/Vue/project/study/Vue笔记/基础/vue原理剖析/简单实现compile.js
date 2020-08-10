// 遍历dom结构，解析指令和插值表达式
class Compile {
    // el是待编译的模板，vm是myVue的实例
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el);

        // 把模板中的内容移到片段中去操作
        this.$fragment = this.node2Fragment(this.$el)

        // 执行编译器
        this.compile(this.$fragment)

        // 放回$el中
        this.$el.appendChild(this.$fragment)
    }

    node2Fragment (el) {
        const fragment = document.createDocumentFragment()
        let child
        // while(child = el.firstChild)
        // 这个语句进行了2个操作：
        //      执行赋值操作child = el.firstChild
        //      执行while(child)，while是条件为真的情况下才执行，也就是必须el.firstChild有值的情况下才执行
        // 能这样写的前提是因为fragment.appendChild会把child从真实的dom节点中抽离出来，倒是el的firstChild一个个变少，最后没有
        // 其他方式得根据情况来写
        while (child = el.firstChild) {
            fragment.appendChild(child)
        }
        return fragment
    }

    compile (el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if (node.nodeType == 1) {
                // 元素
                // console.log('编译元素' + node.nodeName);
                this.compileElement(node)
            } else if (this.isInter(node)) {
                // 只关心{{xxx}}这种结构
                console.log('编译插值文本' + node.textContent);
                this.compileText(node)
            }

            // 递归子节点
            if (node.children && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }

    compileText (node) {
        const exp = RegExp.$1
        this.update(node, exp, 'text')
    }

    update (node, exp, dir) {
        const updator = this[dir + 'Updator']
        updator && updator(node, this.$vm[exp])

        // 创建Watcher，依赖的收集就完成了
        new Watcher(this.$vm, exp, function (value) {
            updator && updator(node, value)
        })
    }

    textUpdator (node, value) {
        node.textContent = value
    }

    compileElement (node) {
        // 关心属性
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            // m-xxx="yyy"
            const attrName = attr.name  // m-xxx
            const exp = attr.value          // exp
            if (attrName.indexOf('m-') == 0) {
                // 是一个指令
                const dir = attrName.substring(2)  // xxx
                this[dir] && this[dir](node, exp)
            }
        })
    }

    text (node, exp) {
        this.update(node, exp, 'text')
    }

    isInter (node) {
        return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
}