<template>
  <div class="container">
    <wtb
      :tabList="tabList"
      :tabBarStyle="tabBarStyle"
      :listItemStyle="listItemStyle"
      :moveTagStyle="moveTagStyle"
      :dragWhiteSpace="dragWhiteSpace"
      :activeFontColor="activeFontColor"
      :noActiveFontColor="noActiveFontColor"
      @change="change"
    ></wtb>
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
  data() {
    return {
      tabList: [
        { title: 'DataBase', isActive: true },
        { title: 'Oracle', isActive: false },
        { title: 'MySQL', isActive: false },
        { title: 'MongoDB', isActive: false },
        { title: 'Redis', isActive: false },
        { title: 'Linux', isActive: false },
        { title: 'shell', isActive: false },
        { title: 'bash', isActive: false },
        { title: '网络', isActive: false },
        { title: 'HCIE', isActive: false },
        { title: 'Cisco', isActive: false },
        { title: 'Python', isActive: false },
        { title: 'RedHat', isActive: false },
        { title: 'CentOS', isActive: false },
        { title: 'Docker', isActive: false }
      ],
      tabBarStyle: { backgroundColor: '' },
      listItemStyle: {
        width: 70,
        height: 50,
        fontSize: 14,
        fontColor: '#6c6c6c'
      },
      moveTagStyle: {
        display: true,
        width: 40,
        height: 2,
        offsetBottom: 5,
        color: 'red'
      },
      dragWhiteSpace: 100,
      activeFontColor: { color: '#000' },
      noActiveFontColor: { color: '#6c6c6c' }
    }
  },
  components: {
    Header: () => import('./components/Header'),
    // Header,
    Links
  },
  methods: {
    handle() {
      create(message, { message: 'xxxxxx' })
    },
    change(index) {
      console.log(index)
    }
  }
}
</script>

<style>
</style>
