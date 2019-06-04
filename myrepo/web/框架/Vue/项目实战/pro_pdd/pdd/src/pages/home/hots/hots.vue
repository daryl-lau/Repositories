<template>
    <div id="hots">
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
        <hotsnav></hotsnav>
    </div>
</template>

<script>
    // 引入swiper
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'

    import hotsnav from './hotsnav'

    import {mapState} from 'vuex'

    export default {
        name: "hots",
        computed: {
            ...mapState(['homecarousel'])
        },
        mounted: function () {
            this.$store.dispatch('getHomeCarousel');
            this.$store.dispatch('getHomeNav');
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
