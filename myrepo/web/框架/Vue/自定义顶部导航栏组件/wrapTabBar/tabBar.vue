<template>
    <div id="tabbar" ref="tabbar">
        <ul class="tabbar-ul"
            ref="tabBarUl"
        >
            <tabBarItems v-for="(value, index) in tabList"
                         :value="value"
                         :index="index"
                         :key="index"
                         :toggleActive="toggleActive"
                         :moveTagStyle="moveTagStyle"
                         :listItemStyle="listItemStyle"
                         :activeFontColor="activeFontColor"
                         :noActiveFontColor="noActiveFontColor"
                         @toggleMoveTag="toggleMoveTag"
            ></tabBarItems>
            <span ref="tabBarSpan"></span>
        </ul>
    </div>
</template>

<script>
    import tabBarItems from './tabBarItems';

    export default {
        name: "topTabBar",
        components: {
            tabBarItems,
        },
        props:
            {
                tabList: Array,
                tabBarStyle: Object,
                toggleActive: Function,
                listItemStyle: Object,
                moveTagStyle: Object,
                dragWhiteSpace: Number,
                activeFontColor: Object,
                noActiveFontColor: Object
            },
        data() {
            return {
                whiteLength: this.dragWhiteSpace,
                startX: 0,
                endX: 0,
                distanceX: 0,
                currentX: 0,
                lastTime: 0,
                timeDis: 0,
                speed: 0,
                translateX: 0,
                spanTranslateX: 0,
                spanOffset: 0,
            }
        },
        methods: {
            addTransition: (obj) => {
                obj.style.transaction = 'all .3s ease';
                obj.style.webkitTransition = 'all .3s ease';

            },
            removeTransition: (obj) => {
                obj.style.transaction = '';
                obj.style.webkitTransition = '';
            },
            changeTranslateX: (obj, x) => {
                obj.style.transform = `translateX(${x}px)`;
                obj.style.webkitTransform = `translateX(${x}px)`
            },
            toggleMoveTag: function (index) {
                this.$emit('handleChange', index);
                // this.translateX = -(index - 2) * this.listItemStyle.width;
                this.translateX = -(index * this.listItemStyle.width - (this.$refs.tabbar.offsetWidth - this.listItemStyle.width) / 2);
                if (this.translateX <= -(this.$refs.tabBarUl.offsetWidth - this.$refs.tabbar.offsetWidth)) {
                    this.translateX = -(this.$refs.tabBarUl.offsetWidth - this.$refs.tabbar.offsetWidth)
                } else if (this.translateX >= 0) {
                    this.translateX = 0
                }
                this.currentX = this.translateX;

                this.spanTranslateX = index * this.listItemStyle.width;

                if (this.$refs.tabBarUl.offsetWidth >= this.$refs.tabbar.offsetWidth) {
                    this.addTransition(this.$refs.tabBarUl);
                    this.changeTranslateX(this.$refs.tabBarUl, this.translateX);
                }

                this.addTransition(this.$refs.tabBarSpan);
                this.changeTranslateX(this.$refs.tabBarSpan, this.spanTranslateX);
            },
        },
        mounted() {
            this.spanOffset = (this.listItemStyle.width - this.moveTagStyle.width) / 2;
            this.$refs.tabBarUl.style.width = this.tabList.length * this.listItemStyle.width + 'px';
            this.$refs.tabBarUl.style.backgroundColor = this.tabBarStyle.backgroundColor;

            if (this.moveTagStyle.display) {
                this.$refs.tabBarSpan.style.width = this.moveTagStyle.width + 'px';
                this.$refs.tabBarSpan.style.height = this.moveTagStyle.height + 'px';
                this.$refs.tabBarSpan.style.left = this.spanOffset + 'px';
                this.$refs.tabBarSpan.style.bottom = this.moveTagStyle.offsetBottom + 'px';
                this.$refs.tabBarSpan.style.backgroundColor = this.moveTagStyle.color;
            } else {
                this.$refs.tabBarSpan.style.display = 'none';
            }

            this.$refs.tabBarUl.addEventListener('touchstart', (e) => {
                // 阻止冒泡
                e.stopPropagation();
                // 获取鼠标按下时的y值
                this.startX = e.touches[0].clientX;
                // 获取鼠标按下时的时间
                this.lastTime = Date.now();
            });
            this.$refs.tabBarUl.addEventListener('touchmove', (e) => {
                // 阻止冒泡
                e.stopPropagation();
                // 获取鼠标移动过程中的y值
                this.endX = e.touches[0].clientX;
                // 计算鼠标走过的距离，鼠标上滑，此值为正，鼠标下滑，此值为负；
                this.distanceX = this.startX - this.endX;
                // 计算出需要滚动的距离，currentY初始为0，后续移动会在之前的基础上进行移动，鼠标上滑，translateY值变小，鼠标下滑，translateY值变大；
                this.translateX = this.currentX - this.distanceX;
                // 执行滚动
                if (this.$refs.tabBarUl.offsetWidth >= this.$refs.tabbar.offsetWidth) {
                    this.removeTransition(this.$refs.tabBarUl);
                    this.changeTranslateX(this.$refs.tabBarUl, this.translateX);
                    // 边界值处理
                    if (this.translateX > this.whiteLength) {
                        this.changeTranslateX(this.$refs.tabBarUl, this.whiteLength);
                    } else if (this.translateX < -(this.$refs.tabBarUl.offsetWidth + this.whiteLength - this.$refs.tabbar.offsetWidth)) {
                        this.changeTranslateX(this.$refs.tabBarUl, -(this.$refs.tabBarUl.offsetWidth + this.whiteLength - this.$refs.tabbar.offsetWidth));
                    }
                }
            });

            this.$refs.tabBarUl.addEventListener('touchend', (e) => {
                e.stopPropagation();
                // 惯性原理:
                //    产生的速度 = 移动距离 / 移动时间
                //    距离 = 松开的坐标 - 上次的坐标  (距离差)
                //    时间 = 松开的时间 - 按下的时间  (时间差)
                // 计算鼠标拖拽的时间
                this.timeDis = Date.now() - this.lastTime;
                // 拖拽时间大于300毫秒，惯性速度为0，否则计算；
                if (this.timeDis > 300) {
                    this.speed = 0;
                } else {
                    // 计算惯性速度
                    this.speed = parseInt(this.distanceX / this.timeDis * 150); // 150为惯性系数，此值越大，惯性效果越大
                }
                // 计算出需要滚动的距离，减去惯性速度，之所以是减，是因为惯性速度的符号由distanceY决定，注意方向的正负
                this.translateX -= this.speed;
                // 边界值处理
                if (this.translateX > 0) {
                    this.translateX = 0;
                    this.currentX = 0;
                } else if ((-(this.$refs.tabBarUl.offsetWidth - this.$refs.tabbar.offsetWidth)) < this.translateX && this.translateX < 0) {
                    this.currentX = this.translateX;
                } else if (this.translateX < -(this.$refs.tabBarUl.offsetWidth - this.$refs.tabbar.offsetWidth)) {
                    this.translateX = -(this.$refs.tabBarUl.offsetWidth - this.$refs.tabbar.offsetWidth);
                    this.currentX = -(this.$refs.tabBarUl.offsetWidth - this.$refs.tabbar.offsetWidth);
                }
                if (this.$refs.tabBarUl.offsetWidth >= this.$refs.tabbar.offsetWidth) {
                    this.addTransition(this.$refs.tabBarUl);
                    this.changeTranslateX(this.$refs.tabBarUl, this.translateX);
                    //还原值
                    this.endX = 0;
                    this.distanceX = 0;
                }
            });
        }
    }
</script>

<style scoped>
    #tabbar {
        overflow: hidden;
    }

    #tabbar .tabbar-ul {
        position: relative;
        padding: 0;
        margin: 0;
    }

    #tabbar .tabbar-ul::after {
        content: '';
        display: block;
        clear: both;
    }

    #tabbar .tabbar-ul li {
        text-align: center;
        float: left;
        display: block;
        font-size: 12px;
        /*cursor: pointer;*/
    }

    #tabbar .tabbar-ul span {
        background-color: skyblue;
        position: absolute;
        z-index: 1;
        left: 0;
        bottom: 0;
    }
</style>
