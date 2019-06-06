<template>
    <div id="hots">
        <!--热门页轮播图-->
        <div class="home-carousel">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(value, index) in homecarousel" :key="index">
                        <img :src="value.imgurl" alt="" width="100%" :href="value.detail">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <!--热门页导航栏-->
        <hotsnav></hotsnav>
        <!--热门中心图片-->
        <hotscenterimg></hotscenterimg>
        <!--热门页商品列表-->
        <hotslist></hotslist>
    </div>
</template>

<script>
    // 引入swiper
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'

    import hotsnav from './hotsnav'
    import hotslist from './hotslist'
    import hotscenterimg from './hotscenterimg'

    import {mapState} from 'vuex'

    export default {
        name: "hots",
        computed: {
            ...mapState(['homecarousel'])
        },
        mounted: function () {
            this.$store.dispatch('getHomeCarousel');
            this.$store.dispatch('getHomeNav');
            this.$store.dispatch('getHomeShopList');
            this.$store.dispatch('getHomeBanner');
        },
        watch: {
            homecarousel: function () {
                this.$nextTick(() => {
                    new Swiper('.swiper-container', {
                        autoplay: true,//可选选项，自动滑动
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination',
                        },
                    })
                })
            }
        },
        components: {
            hotsnav,
            hotslist,
            hotscenterimg
        }
    }
</script>

<style scoped>
    .home-carousel {
        width: 100%;
        height: 100%;
    }

    .swiper-container {
        width: 100%;
    }
</style>
