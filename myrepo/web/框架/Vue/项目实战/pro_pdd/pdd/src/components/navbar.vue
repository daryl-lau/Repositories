<template>
  <div class="navbar" >
    <div class="items" @click="switchTo('/home')">
      <img :src="activeImg('/home', 0)" alt>
      <span :class="{active: isActive('/home') }">首页</span>
    </div>
    <div class="items" @click="switchTo('/intro')">
      <img :src="activeImg('/intro', 1)" alt>
      <span :class="{active: isActive('/intro') }">推荐</span>
    </div>
    <div class="items" @click="switchTo('/search')">
      <img :src="activeImg('/search', 2)" alt>
      <span :class="{active: isActive('/search') }">搜索</span>
    </div>
    <div class="items" @click="switchTo('/chat')">
      <img :src="activeImg('/chat', 3)" alt>
      <span :class="{active: isActive('/chat') }">聊天</span>
    </div>
    <div class="items" @click="switchTo('/mine')">
      <img :src="activeImg('/mine', 4)" alt>
      <span :class="{active: isActive('/mine') }">我的</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'navbar',
    data() {
        return {
            navbarImgs: [
                {
                    noSelected: require('./../common/imgs/icon_home.png'),
                    Selected: require('./../common/imgs/icon_home_selected.png')
                },
                {
                    noSelected: require('./../common/imgs/icon_intro.png'),
                    Selected: require('./../common/imgs/icon_intro_selected.png')
                },
                {
                    noSelected: require('./../common/imgs/icon_search.png'),
                    Selected: require('./../common/imgs/icon_search_selected.png')
                },
                {
                    noSelected: require('./../common/imgs/icon_chat.png'),
                    Selected: require('./../common/imgs/icon_chat_selected.png')
                },
                {
                    noSelected: require('./../common/imgs/icon_mine.png'),
                    Selected: require('./../common/imgs/icon_mine_selected.png')
                }
            ]
        }
    },
    components: {},
    methods: {
        switchTo(path) {
            this.$router.replace(path)
        },
        isActive(path) {
            const reg = new RegExp('^' + path + '')
            return reg.test(this.$route.path)
        },
        activeImg(path, index) {
            const reg = new RegExp('^' + path + '')
            return reg.test(this.$route.path)
                ? this.navbarImgs[index].Selected
                : this.navbarImgs[index].noSelected
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
        span.active {
            color: red;
        }
    }
}
</style>