<template>
  <div class="container">
    <div class="row">
      <Header></Header>
    </div>
    <div class="row">
      <Links></Links>
      <!-- 一级路由出口 -->
      <router-view></router-view>
    </div>
    <button @click="handle()">点击弹窗</button>
  </div>
</template>

<script>
// import Header from './components/Header'
import Links from './components/Links'

import create from './components/myComps/message/create'
import message from './components/myComps/message/message'

export default {
    components: {
        Header: () => import('./components/Header'),
        // Header,
        Links
    },
    methods: {
        handle() {
            create(message, { message: 'xxxxxx' })
        }
    }
}
</script>

<style>
</style>
