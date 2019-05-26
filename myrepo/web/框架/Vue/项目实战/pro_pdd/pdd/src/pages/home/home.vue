<template>
    <div class="">
        <topTabBar :tabList="tabList" :toggleActive="toggleActive" :listItem="listItem"
                   :moveTag="moveTag"
                   :dragWhiteSpace="dragWhiteSpace"
                   :tabBar="tabBar"
        ></topTabBar>
    </div>
</template>

<script type="text/ecmascript-6">
    import topTabBar from './../../components/topTabBar/topTabBar'

    export default {
        name: 'home',
        data() {
            return {
                tabList: [
                    {title: '数据库', isActive: true},
                    {title: 'Oracle', isActive: false},
                    {title: 'MySQL', isActive: false},
                    {title: 'MongoDB', isActive: false},
                    {title: 'Redis', isActive: false},
                    {title: 'Linux', isActive: false},
                    {title: 'shell', isActive: false},
                    {title: 'bash', isActive: false},
                    {title: '网络', isActive: false},
                    {title: 'HCIE', isActive: false},
                    {title: 'Cisco', isActive: false},
                    {title: 'Python', isActive: false},
                    {title: 'RedHat', isActive: false},
                    {title: 'CentOS', isActive: false},
                    {title: 'Docker', isActive: false},
                ],
                tabBar:{backgroundColor: ''},
                listItem: {width: 70, height: 40, fontSize: 12, fontColor: '#6c6c6c'},
                moveTag: {width: 30, height: 2, offsetBottom: 5, color: 'skyblue'},
                dragWhiteSpace: 100,
            }
        },
        components: {
            topTabBar,
        },
        methods: {
            toggleActive(index) {
                for (let i = 0; i < this.tabList.length; i++) {
                    this.tabList[i].isActive = false;
                    this.tabList[index].isActive = true;
                }
            },
        }
    }
</script>

<style lang="less" scoped>
</style>
