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
    import topTabBar from './tabBar'
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
                default: {width: 70, height: 50, fontSize: 12, fontWeight: 400}
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

