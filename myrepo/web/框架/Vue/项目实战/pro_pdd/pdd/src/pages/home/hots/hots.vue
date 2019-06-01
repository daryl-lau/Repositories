<template>
    <div class="home-carousel">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(value, index) in homecarousel" :key="index">
                    <img :src="value.imgUrl" alt="" width="100%" :href="value.hrefUrl">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 引入swiper
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'

    import {mapState} from 'vuex'

    export default {
        name: "hots",
        computed: {
            ...mapState(['homecarousel'])
        },
        mounted: function () {
            this.$store.dispatch('getHomeCarousel');
        },
        watch: {
            homecarousel: function () {
                this.$nextTick(() => {
                    new Swiper('.swiper-container', {
                        autoplay: true,//可选选项，自动滑动
                        loop: true
                    })
                })
            }
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
