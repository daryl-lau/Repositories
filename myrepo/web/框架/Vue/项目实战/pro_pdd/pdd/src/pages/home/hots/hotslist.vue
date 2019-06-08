<template>
    <div id="shoplist-container">
        <ul>
            <li v-for="(value, index) in homeshoplist.goods_list" :key="index">
                <div class="shoplist-img">
                    <img :src="value.image_url" alt="">
                </div>
                <div class="shoplist-name">
                    <span v-text="value.goods_name"></span>
                </div>
                <div class="shoplist-detail">
                    <div class="detail-left">
                        <div class="goods-price">
                            <span>¥</span>
                            <span v-text="value.group.price / 100"></span>
                        </div>
                        <div class="goods-total">
                            <span v-text="value.sales_tip"></span>
                        </div>
                    </div>
                    <div class="detail-right">
                        <div class="user-avatar">
                            <div v-for="(user, index) in value.bubble">
                                <img :src="user.avatar" alt="">
                            </div>
                        </div>
                        <div class="btn">
                            <button>去拼单></button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "hotslist",
        computed: {
            ...mapState(['homeshoplist'])
        }
    }
</script>

<style scoped lang="less">
    #shoplist-container {
        width: 100%;
        height: 100%;
        margin-top: .5rem;

        ul {
            width: 100%;
            height: 100%;

            li {
                width: 100%;
                height: 100%;
                margin-bottom: 1.5rem;

                .shoplist-img {
                    img {
                        width: 100%;
                    }
                }

                .shoplist-name {
                    padding: .2rem 1rem;
                    font-size: 1.2rem;
                }

                .shoplist-detail {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .detail-left {
                        display: flex;
                        flex-direction: row;
                        align-items: center;

                        .goods-price {
                            margin-right: .5rem;

                            span {
                                color: #ff4400;
                                font-size: 1.3rem;
                                font-weight: bolder;
                            }

                            span:nth-child(1) {
                                margin-left: 1rem;
                            }
                        }

                        .goods-total {
                        }
                    }

                    .detail-right {
                        display: flex;
                        flex-direction: row;
                        align-items: center;

                        .user-avatar {
                            display: flex;
                            padding-right: .5rem;

                            div {
                                img {
                                    width: 2.5rem;
                                    border-radius: 50%;
                                }
                            }
                        }

                        .btn {
                            margin-right: 1rem;
                            button {
                                font-size: 1.2rem;
                                color: #FFFFFF;
                                background-color: red;
                                padding: .2rem;
                                border-radius: 1rem;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
