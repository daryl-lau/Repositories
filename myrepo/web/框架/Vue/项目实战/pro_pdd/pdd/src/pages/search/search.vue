<template>
    <div class="search-wrap">
        <searchbar></searchbar>
        <div class="search-content">
            <!--左边-->
            <div class="search-class">
                <ul>
                    <li v-for="(value, index) in searchgoods.data" :key="index">
                        <span>{{value.name}}</span>
                    </li>
                </ul>
            </div>
            <!--右边-->
            <div class="search-goods">
                <ul>
                    <li class="search-goods-items" v-for="(items, index) in searchgoods.data" :key="index">
                        <div class="title">
                            <div class="search-title">{{items.name}}</div>
                            <div class="more">查看更多 ></div>
                        </div>
                        <ul class="shops-items">
                            <li v-for="(item, index) in items.items" :key="index">
                                <img :src="item.icon" alt="">
                                <span v-text="item.title"></span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import searchbar from './searchbar'

    import BScroll from 'better-scroll'

    import {mapState} from 'vuex'

    export default {
        name: 'search',
        data() {
            return {}
        },
        computed: {
            ...mapState(['searchgoods'])
        },
        components: {
            searchbar,
        },
        mounted() {
            this.$store.dispatch('getSearchGoods');
            // this._initBScroll()
        },
        methods: {
            _initBScroll() {
                // 1.2.1 左边的视图
                this.leftScroll = new BScroll('.search-class', {});
                // 1.2.2 右边的视图
                this.rightScroll = new BScroll('.search-goods', {
                    probeType: 3
                });
                // 1.2.3 监听右边的滚动
                // this.rightScroll.on('scroll', (pos) => {
                //     this.scrollY = Math.abs(Math.round(pos.y));
                // });
            },
        },
        watch: {
            searchgoods() {
                this.$nextTick(() => {
                    // 1.1 初始化
                    this._initBScroll();
                    // 1.2 求出右边所有版块的头部高度
                    // this._initRightLiTops();
                });
            }
        },
    }
</script>

<style lang="less" scoped>
    .search-wrap {
        &::after {
            content: '';
            width: 100%;
            height: 1px;
            background-color: #e8e8e8;
            position: absolute;
            left: 0;
        }
    }

    .search-content {
        position: absolute;
        top: 50px;
        bottom: 55px;
        display: flex;
        width: 100%;
        overflow: hidden;

        .search-class {
            width: 20%;
            /*height: 100%;*/
            /*overflow: hidden;*/


            ul li {
                color: #666;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 5rem;
                font-size: 1.2rem;
                background-color: #fafafa;
            }

            .current {
                color: #e02e24;
            }


            .current::before {
                content: '';
                background-color: #e02e24;
                width: 4px;
                height: 30px;
                position: absolute;
                left: 0;
            }

        }

        .search-goods {
            width: 80%;
            /*height: 100%;*/
            /*overflow: hidden;*/


            .search-goods-items {
                .title {
                    /*width: 100%;*/
                    height: 3rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .search-title {
                        color: #999;
                        font-size: 1.2rem;
                        margin-left: 1rem;
                    }

                    .more {
                        margin-right: 1rem;
                        font-size: 1.2rem;
                        color: #999;
                    }
                }


                .shops-items {
                    display: flex;
                    /*width: 100%;*/
                    flex-wrap: wrap;

                    li {
                        width: 33%;
                        height: 130px;
                        display: flex;
                        flex-flow: column;
                        justify-content: center;
                        align-items: center;
                        padding: 1rem;

                        img {
                            width: 90px;
                        }

                        span {
                            color: #666;
                        }
                    }
                }

            }

        }
    }
</style>
