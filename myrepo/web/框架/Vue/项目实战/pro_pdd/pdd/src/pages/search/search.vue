<template>
    <div class="search-wrap">
        <searchbar></searchbar>
        <div class="search-content">
            <div class="search-class">
                <ul>
                    <li v-for="(value, index) in searchgoods.data" :key="index">{{value.name}}</li>
                </ul>
            </div>
            <div class="search-goods">
                <ul class="search-goods-wrap">
                    <li class="search-goods-items" v-for="(items, index) in searchgoods.data" :key="index">
                        <div class="title">
                            <div class="search-title">{{items.name}}</div>
                            <div class="more">查看更多 ></div>
                        </div>
                        <div class="search-good">
                            <ul>
                                <li v-for="(item, index) in items.items">
                                    <img :src="item.icon" alt="">
                                    <span v-text="item.title"></span>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import searchbar from './searchbar'

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
            this.$store.dispatch('getSearchGoods')
        }
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

        .search-class {
            width: 20%;
            height: 100%;
            /*background-color: #f5f5f5;*/
            overflow: hidden;

            ul li {
                color: #666;
                text-align: center;
                line-height: 5rem;
                height: 5rem;
                font-size: 1.2rem;
                background-color: #fafafa;
            }
        }

        .search-goods {
            width: 80%;
            overflow: hidden;

            .search-goods-wrap {
                .search-goods-items {
                    .title {
                        width: 100%;
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

                    .search-good {
                        ul {
                            display: flex;
                            width: 100%;
                            flex-wrap: wrap;
                            float: left;

                            li {
                                width: 33.3%;
                                /*height: 90px;*/
                                display: flex;
                                flex-flow: column;
                                justify-content: center;
                                align-items: center;
                                padding: 1rem;

                                img {
                                    width: 100%;
                                }
                                span {
                                    color: #666;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
