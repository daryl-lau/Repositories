<template>
    <div class="search-bar">
        <div class="btn-wrap" @click="show">
            <img src=".././../common/imgs/icon_search.png" alt="">
            <span>搜索</span>
        </div>
        <div class="search-panel" v-if="isShow">
            <div class="search-nav">
                <div class="search-input">
                    <img src="../../common/imgs/search.png" alt="" style="width: 25px">
                    <input ref="mySearch" type="search" placeholder="女装"/>
                </div>
                <button @click="hide">取消</button>
            </div>
            <div class="search-content">
                <div class="title">
                    <img src="../../common/imgs/hot.png" alt="" style="width: 25px">
                    <span>热门搜索</span>
                </div>
                <ul class="search-list">
                    <li>面巾纸</li>
                    <li>浴巾儿童</li>
                    <li>石榴水果</li>
                    <li>冰箱保鲜盒</li>
                    <li>富豪卷纸</li>
                    <li>毛巾浴袍</li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "searchbar",
        data() {
            return {
                isShow: false,
            }
        },
        methods: {
            show() {
                this.isShow = true
            },
            hide() {
                this.isShow = false
            }
        }
    }
</script>

<style scoped lang="less">
    .search-bar {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;

        .btn-wrap {
            width: 80%;
            height: 80%;
            border-radius: 10px;
            background-color: #e8e8e8;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 20px;
            }

            span {
                font-size: 16px;
                margin-left: 5px;
            }
        }

        .search-panel {
            width: 100%;
            height: 100%;
            background-color: #fff;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 1000;

            .search-nav {
                width: 100%;;
                height: 50px;
                /*border-bottom: 1px solid #dddddd;*/
                padding: 0 20px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;

                .search-input {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    width: 85%;
                    height: 38px;
                    border-radius: 5px;
                    background-color: #ededed;
                    padding: 0 10px;

                    input {
                        background-color: transparent;
                        width: 90%;
                        height: 90%;
                        padding-left: 10px;
                        color: #aaa;
                        font-size: 16px;
                        outline: none;
                    }
                }

                button {
                    background-color: transparent;
                    font-size: 16px;
                    color: #aaa
                }

                &::after {
                    content: '';
                    width: 100%;
                    height: 1px;
                    background-color: #e8e8e8;
                    position: absolute;
                    left: 0;
                    top: 50px;
                    /*bottom: 0;*/
                }
            }

            .search-content {
                padding: 30px 15px;

                .title {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    color: #aaa;
                    margin-bottom: 10px;
                }

                .search-list {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;

                    li {
                        background-color: #ededed;
                        color: #aaa;
                        margin: 5px 15px;
                        padding: 5px 5px;
                        border-radius: 10px;
                    }
                }
            }
        }
    }
</style>
