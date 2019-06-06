<template>
    <div class="">
        <wtb
            :tabList="tabList"
            :tabBarStyle="tabBarStyle"
            :listItemStyle="listItemStyle"
            :moveTagStyle="moveTagStyle"
            :dragWhiteSpace="dragWhiteSpace"
            :activeFontColor="activeFontColor"
            :noActiveFontColor="noActiveFontColor"
            @change="change"
        ></wtb>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'home',
        data() {
            return {
                tabList: [
                    {title: '热门', isActive: true},
                    {title: '服饰', isActive: false},
                    {title: '鞋包', isActive: false},
                    {title: '母婴', isActive: false},
                    {title: '百货', isActive: false},
                    {title: '食品', isActive: false},
                    {title: '内衣', isActive: false},
                    {title: '男装', isActive: false},
                    {title: '电器', isActive: false},
                ],
                tabBarStyle: {backgroundColor: '#ffffff'},
                listItemStyle: {width: 70, height: 50, fontSize: 14, fontWeight: 700},
                moveTagStyle: {display: true, width: 30, height: 2, offsetBottom: 5, color: 'skyblue'},
                dragWhiteSpace: 100,
                activeFontColor: {color: 'skyblue'},
                noActiveFontColor: {color: '#6c6c6c'},
                routerList: [
                    '/home/hots',
                    '/home/dress',
                    '/home/shoes',
                    '/home/mbaby',
                    '/home/department',
                    '/home/foods',
                    '/home/underwear',
                    '/home/mens',
                    '/home/electrical',
                ]
            }
        },
        components: {},

        methods: {
            change(index){
                console.log(index);
                this.$router.replace(this.routerList[index])
            }
        },
    }
</script>

<style lang="less" scoped>
</style>
