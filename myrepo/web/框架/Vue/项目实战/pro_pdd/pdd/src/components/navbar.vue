<template>
  <div class="navbar">
    <div class="items" @click="switchTo('/home')">
      <img src="../common/imgs/icon_home.png" alt>
      <span>首页</span>
    </div>
    <div class="items" @click="switchTo('/intro')">
      <img src="../common/imgs/icon_intro.png" alt>
      <span>推荐</span>
    </div>
    <div class="items" @click="switchTo('/search')">
      <img src="../common/imgs/icon_search.png" alt>
      <span>搜索</span>
    </div>
    <div class="items" @click="switchTo('/chat')">
      <img src="../common/imgs/icon_chat.png" alt>
      <span>聊天</span>
    </div>
    <div class="items" @click="switchTo('/mine')">
      <img src="../common/imgs/icon_mine.png" alt>
      <span>我的</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'navbar',
    data() {
        return {}
    },
    components: {},
    methods: {
        switchTo(path) {
          this.$router.replace(path)
        }
    }
}
</script>

<style lang="less" scoped>
.navbar {
    width: 100%;
    height: 55px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: fixed;
    left: 0;
    bottom: 0;
    box-shadow: 0 -2px 5px #b6b6b6;
    .items {
        padding-top: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        img {
            width: 45%;
            padding-bottom: 2px;
        }
        span {
            font-size: 12px;
        }
    }
}
</style>