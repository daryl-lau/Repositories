<template>
    <div class="search">
        <!--搜索导航-->
        <searchbar></searchbar>
        <div class="shop">
            <!--左边-->
            <div class="menu-wrapper">
                <ul>
                    <li
                        class="menu-item"
                        v-for="(goods, index) in searchgoods.data"
                        :key="index"
                        ref="menuList"
                    >
                        <span>{{goods.name}}</span>
                    </li>
                </ul>
            </div>
            <!--右边-->
            <div class="shop-wrapper">
                <ul>
                    <li class="shops-li" v-for="(goods, index) in searchgoods.data" :key="index">
                        <!--头部-->
                        <div class="shops-title">
                            <h4>{{goods.name}}</h4>
                            <a href="">查看更多 ></a>
                        </div>
                        <!--身体-->
                        <ul class="shops-items">
                            <li v-for="(item, index) in goods.items" :key="index">
                                <img :src="item.icon" alt="">
                                <span>{{item.title}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <!--显示面板-->
        <!--search-panel v-if="isShow" :showSearchPanel="showSearchPanel"/>-->
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
                this.leftScroll = new BScroll('.menu-wrapper', {});
                // 1.2.2 右边的视图
                this.rightScroll = new BScroll('.shop-wrapper', {
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
    .search {
        background: #F5F5F5;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .shop {
            display: flex;
            position: absolute;
            top: 60px;
            bottom: 50px;
            width: 100%;
            overflow: hidden;

            .menu-wrapper {
                background-color: #e0e0e0;
                width: 80px;
                flex: 0 0 80px;

                .menu-item {
                    width: 100%;
                    height: 60px;
                    background-color: #fafafa;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: lighter;
                    color: #666666;
                    position: relative;
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

            .shop-wrapper {
                flex: 1;
                background-color: #fff;

                .shops-title {
                    display: flex;
                    flex-direction: row;
                    padding: 0 10px;
                    height: 44px;
                    align-items: center;
                    justify-content: space-between;
                    color: #999;

                    a {
                        color: #999;
                        text-decoration: none;
                        font-weight: lighter;
                    }
                }

                .shops-items {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        display: flex;
                        flex-direction: column;
                        width: 33.3%;
                        height: 90px;
                        justify-content: center;
                        align-items: center;
                        color: #666;
                        font-weight: lighter;
                        font-size: 14px;

                        img {
                            width: 60%;
                            height: 60%;
                            margin-bottom: 5px;
                        }
                    }
                }
            }
        }
    }
</style>
