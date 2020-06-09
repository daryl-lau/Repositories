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
  </div>
</template>

<script>
import Header from './components/Header'
import Links from './components/Links'
export default {
    components: {
        Header,
        Links,
    }
}
</script>

<style>
</style>
