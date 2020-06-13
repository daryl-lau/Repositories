import Vue from 'vue'

export default function create(comp, props) {

    const vm = new Vue({
        render: function (createElement) {
            return createElement(comp, { props })
        }
    }).$mount()

    const dom = vm.$el

    document.querySelector('body').appendChild(dom);

    console.log(vm);
    // return vm
}