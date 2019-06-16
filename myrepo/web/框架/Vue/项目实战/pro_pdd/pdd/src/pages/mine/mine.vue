<template>
    <div v-if="this.userinfo._id">个人中心</div>
    <SelectLogin v-else></SelectLogin>
</template>

<script type="text/ecmascript-6">
    import SelectLogin from './../login/selectLogin'
    import {mapState} from 'vuex'

    export default {
        name: 'mine',
        data() {
            return {}
        },
        components: {SelectLogin},
        computed: {
            ...mapState(['userinfo'])
        }
    }
</script>

<style lang="less" scoped>
</style>
