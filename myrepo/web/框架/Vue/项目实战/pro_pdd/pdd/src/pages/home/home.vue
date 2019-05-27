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
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'home',
        data() {
            return {
                tabList: [
                    {title: 'DataBase', isActive: true},
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
                tabBarStyle: {backgroundColor: ''},
                listItemStyle: {width: 70, height: 50, fontSize: 14, fontWeight: 400},
                moveTagStyle: {display: true, width: 30, height: 2, offsetBottom: 5, color: 'skyblue'},
                dragWhiteSpace: 100,
                activeFontColor: {color: 'skyblue'},
                noActiveFontColor: {color: '#6c6c6c'}
            }
        },
        components: {},
        methods: {
            toggleActive(index) {
                for (let i = 0; i < this.tabList.length; i++) {
                    this.tabList[i].isActive = false;
                    this.tabList[index].isActive = true;
                }
            },
            change(index){
                console.log(index);
            }
        }
    }
</script>

<style lang="less" scoped>
</style>
