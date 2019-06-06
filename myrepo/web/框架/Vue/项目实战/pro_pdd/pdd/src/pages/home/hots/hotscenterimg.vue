<template>
    <div id="center-banner">
        <img :src="homebanner.img" alt="">
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "hotscenterimg",
        computed:{
            ...mapState(['homebanner'])
        }
    }
</script>

<style scoped lang="less">
    #center-banner {
        margin-top: .5rem;
        width: 100%;
        img {
            width: 100%;
        }
    }
</style>
