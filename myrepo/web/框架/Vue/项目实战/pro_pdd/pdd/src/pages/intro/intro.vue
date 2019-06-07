<template>
    <div class="rec-container">
        <recgoods v-for="(items, index) in recshoplist" :items="items" :key="index"></recgoods>
    </div>
</template>

<script type="text/ecmascript-6">
    import recgoods from '../../components/recgoods'

    import {mapState} from 'vuex'

    export default {
        name: 'intro',
        data() {
            return {}
        },
        components: {recgoods},
        computed: {
            ...mapState(['recshoplist'])
        },

        mounted() {
            this.$store.dispatch('getRecShopList', {'app_name': 'rectab_sim_gyl', 'offset': 80, 'count': 20})
        },
        methods: {}
    }
</script>

<style lang="less" scoped>
    .rec-container {
        /*float: left;*/
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #f5f5f5;
        div {
            margin-bottom: 1%;
        }

        div:nth-child(2n-1) {
            margin-right: 1%;
        }
    }
</style>
