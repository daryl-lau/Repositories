<template>
    <div class="goods-container">
        <div class="goods-img">
            <img :src="items.thumb_url" alt="" @click="dealWithgoods(items.goods_id)">
        </div>
        <div class="goods-name">
            <span v-text="items.short_name"></span>
        </div>
        <div class="goods-tag">
            <span v-for="(tags, index) in items.tag_list" :style="{color: tags.text_color}">{{tags.text}}</span>
        </div>
        <div class="goods-detail">
            <div class="goods-price-sale">
                <div class="goods-price">
                    <span>¥</span>
                    <span v-text="items.price / 100"></span>
                </div>
                <div class="goods-sale">
                    <span v-text="items.sales_tip"></span>
                </div>
            </div>
            <div class="found">
                <button>发现 ></button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "recgoods",
        props: {
            items: Object,
        },
        methods: {
            dealWithgoods(id) {
                console.log(id);
            }
        }
    }
</script>

<style scoped lang="less">
    .goods-container {
        width: 49.5%;
        background-color: #fff;
        padding-bottom: .3rem;

        .goods-img {
            img {
                width: 100%;
            }
        }

        .goods-name {
            height: 2rem;
            font-size: .5rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 2rem;
            padding-left: .5rem;
        }

        .goods-tag {
            padding-left: .5rem;
            font-size: .5rem;
            margin: .2rem 0;
            height: 1.5rem;

            span {
                background-color: rgba(255, 87, 6, 0.08);
                margin-right: .2rem;
            }
        }

        .goods-detail {
            padding-left: .5rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            .goods-price-sale {
                display: flex;
                align-items: center;

                .goods-price {
                    margin-right: .3rem;

                    span {
                        color: #e02e24;
                        font-weight: bolder;
                    }

                    span:nth-child(1) {
                        font-size: 1.2rem;
                    }

                    span:nth-child(2) {
                        /*font-size: 1.5rem;*/
                        margin-left: -.1rem;
                    }
                }

                .goods-sale {
                    span {
                        font-size: .3rem;
                        color: #9c9c9c;
                    }
                }
            }

            .found {
                width: 3rem;
                height: 1.5rem;


                button {
                    width: 100%;
                    height: 100%;
                    border:  1px solid #c6c6c6;
                    border-right: none;
                    background-color: #ffffff;
                    border-bottom-left-radius: 1rem;
                    border-top-left-radius: 1rem;
                    padding-left: .5rem;
                    font-size: .5rem;
                    /*background-color: #fff;*/
                    /*border: 1px #9c9c9c;*/
                }

            }

        }
    }
</style>
