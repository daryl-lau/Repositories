<template>
    <div class="search-wrap">
        <searchbar></searchbar>
        <div class="search-content">
            <!--左边-->
            <div class="search-class">
                <ul>
                    <li v-for="(value, index) in searchgoods.data"
                        :key="index"
                        :class="{current: curIndex === index}"
                        @click="clickLeftLi(index)"
                        ref="menuList"
                    >
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
            return {
                scrollY: 0,
                rightLiTops: [],
            }
        },
        computed: {
            ...mapState(['searchgoods']),
            curIndex() {
                // 1.1 获取数据
                const {scrollY, rightLiTops} = this;
                // 1.2 取出索引
                return rightLiTops.findIndex((liTop, index) => {
                    this._leftScroll(index);
                    return scrollY >= liTop && scrollY < rightLiTops[index + 1];
                });
            }
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
                this.rightScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            // 1.3初始化右边高度数组
            _initRightLiTops() {
                let tempArr = [];
                let top = 0;
                tempArr.push(top);
                let allLis = this.$el.getElementsByClassName('search-goods-items');
                // console.log(allLis);
                Array.prototype.slice.call(allLis).forEach((li, index) => {
                    if (index === allLis.length - 1) {
                        li.style.paddingBottom = `${window.innerHeight - li.clientHeight - 100}px`;
                    }
                    top += li.offsetHeight;
                    tempArr.push(top);
                });
                // console.log(tempArr);
                this.rightLiTops = tempArr;
            },
            // 1.4 点击左边
            clickLeftLi(index) {
                this.scrollY = this.rightLiTops[index];
                // this._leftScroll(index);
                this.rightScroll.scrollTo(0, -this.scrollY, 300);
            },
            // 1.5 左边联动
            _leftScroll(index) {
                console.log(index);
                // 1. 取出左边所有的li标签
                let menuLists = this.$refs.menuList;
                let el = menuLists[index];
                // console.log(menuLists);
                // 2. 滚动到对应的元素上去
                this.leftScroll.scrollToElement(el, 0, 0, -100);
            }
        },
        watch: {
            searchgoods() {
                this.$nextTick(() => {
                    // 1.1 初始化
                    this._initBScroll();
                    // 1.2 求出右边所有版块的头部高度
                    this._initRightLiTops();
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
                font-size: 1rem;
                background-color: #fafafa;
            }

            .current {
                span {
                    color: #e02e24;
                }
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
                        font-size: 1rem;
                        margin-left: 1rem;
                    }

                    .more {
                        margin-right: 1rem;
                        font-size: 1rem;
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
                            font-size: .7rem;
                        }
                    }
                }

            }

        }
    }
</style>
