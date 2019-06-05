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
    import IScroll from 'iscroll'

    export default {
        name: "hotsnav",
        computed: {
            ...mapState(['homenav'])
        },
        mounted() {
            new IScroll('#wrapper', {scrollX: true})
        }
    }
</script>

<style scoped lang="less">
    #wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;

        ul {
            width: 55rem;
            height: 100%;

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
