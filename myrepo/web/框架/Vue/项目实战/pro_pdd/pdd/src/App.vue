<template>
    <div id="app">
        <navbar v-show="$route.meta.isShow"></navbar>
        <router-view></router-view>
    </div>
</template>

<script>
    import navbar from './components/navbar'

    export default {
        name: 'App',
        components: {
            navbar,
        },
    }
</script>

<style scoped lang="less">
    #app {
        margin-bottom: 60px;
    }
</style>
