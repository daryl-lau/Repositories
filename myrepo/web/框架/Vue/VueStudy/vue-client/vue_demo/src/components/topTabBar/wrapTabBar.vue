<template>
    <div>
        <topTabBar :tabList="tabList"
                   :toggleActive="toggleActive"
                   :listItemStyle="listItemStyle"
                   :moveTagStyle="moveTagStyle"
                   :tabBarStyle="tabBarStyle"
                   :dragWhiteSpace="dragWhiteSpace"
                   :activeFontColor="activeFontColor"
                   :noActiveFontColor="noActiveFontColor"
                   @handleChange="handleChange"
        ></topTabBar>
    </div>
</template>

<script type="text/ecmascript-6">
    import topTabBar from './topTabBar'

    export default {
        name: 'wrapTabBar',
        props: {
            tabList: {
                type: Array,
                default: [
                    {title: '测试数据', isActive: true},
                    {title: '测试数据', isActive: false},
                    {title: '测试数据', isActive: false},
                    {title: '测试数据', isActive: false},
                    {title: '测试数据', isActive: false},
                    {title: '测试数据', isActive: false},
                    {title: '测试数据', isActive: false},
                    {title: '测试数据', isActive: false},
                    {title: '测试数据', isActive: false},
                    {title: '测试数据', isActive: false},
                    {title: '测试数据', isActive: false},
                    {title: '测试数据', isActive: false},
                    {title: '测试数据', isActive: false},
                    {title: '测试数据', isActive: false},
                    {title: '测试数据', isActive: false},
                ],
                required: true
            },
            tabBarStyle: {
                type: Object,
                default: {backgroundColor: ''}
            },
            listItemStyle: {
                type: Object,
                default: {width: 70, height: 50, fontSize: 12, fontColor: '#6c6c6c'}
            },
            moveTagStyle: {
                type: Object,
                default: {width: 30, height: 2, offsetBottom: 5, color: 'skyblue'}
            },
            dragWhiteSpace: {
                type: Number,
                default: 100
            },
            activeFontColor: {
                type: Object,
                default: {color: 'skyblue'}
            },
            noActiveFontColor: {
                type: Object,
                default: {color: '#6c6c6c'}
            }
        },
        // data() {
        //     return {
        //         tabList: [
        //             {title: '数据库', isActive: true},
        //             {title: 'Oracle', isActive: false},
        //             {title: 'MySQL', isActive: false},
        //             {title: 'MongoDB', isActive: false},
        //             {title: 'Redis', isActive: false},
        //             {title: 'Linux', isActive: false},
        //             {title: 'shell', isActive: false},
        //             {title: 'bash', isActive: false},
        //             {title: '网络', isActive: false},
        //             {title: 'HCIE', isActive: false},
        //             {title: 'Cisco', isActive: false},
        //             {title: 'Python', isActive: false},
        //             {title: 'RedHat', isActive: false},
        //             {title: 'CentOS', isActive: false},
        //             {title: 'Docker', isActive: false},
        //         ],
        //         tabBarStyle:{backgroundColor: ''},
        //         listItemStyle: {width: 70, height: 50, fontSize: 12, fontColor: '#6c6c6c'},
        //         moveTagStyle: {width: 30, height: 2, offsetBottom: 5, color: 'skyblue'},
        //         dragWhiteSpace: 100,
        //         activeFontColor:{color: 'skyblue'},
        //         noActiveFontColor:{color: '#6c6c6c'}
        //
        //     }
        // },
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
            handleChange(index){
                this.$emit('change', index)
            }
        }
    }
</script>

<style scoped>
</style>

