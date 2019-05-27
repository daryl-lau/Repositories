import wrapTabBar from './wrapTabBar'

const wtb = {
    install: function (Vue) {
        Vue.component('wtb', wrapTabBar)
    }
};

export default wtb