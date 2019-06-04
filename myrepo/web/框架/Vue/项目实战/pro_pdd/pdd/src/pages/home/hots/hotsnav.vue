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

    export default {
        name: "hotsnav",
        computed: {
            ...mapState(['homenav'])
        }
    }
</script>

<style scoped lang="less">

</style>
