<template>
    <div id="wrapper">
        <ul>
            <li>
                <div v-for="(value, idnex) in homenav.item1">
                    <img :src="value.iconurl" alt="">
                    <span v-text="value.icontitle"></span>
                </div>
            </li>
            <li>
                <div v-for="(value, idnex) in homenav.item2">
                    <img :src="value.iconurl" alt="">
                    <span v-text="value.icontitle"></span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    // import IScroll from 'iscroll'

    import BScroll from '@better-scroll/core'

    export default {
        name: "hotsnav",
        computed: {
            ...mapState(['homenav'])
        },
        mounted() {
            new BScroll('#wrapper', {scrollX: true})
        }
    }
</script>

<style scoped lang="less">
    #wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
        white-space: nowrap;

        ul {
            width: 60rem;
            height: 100%;
            display: inline-block;

            li {
                display: flex;
                text-align: center;

                div {
                    display: flex;
                    flex-direction: column;

                    img {
                        width: 3.5rem;
                        height: 3.5rem;
                        padding: .5rem 2rem;
                    }

                    span {
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
