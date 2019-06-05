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
                screenWidth: document.body.clientWidth,
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
                this.translateX = -(index * this.listItemStyle.width - (this.screenWidth - this.listItemStyle.width) / 2);
                if (this.translateX <= -(this.$refs.tabBarUl.offsetWidth - this.screenWidth)) {
                    this.translateX = -(this.$refs.tabBarUl.offsetWidth - this.screenWidth)
                } else if (this.translateX >= 0) {
                    this.translateX = 0
                }
                this.currentX = this.translateX;
                this.spanTranslateX = index * this.listItemStyle.width;
                if (this.$refs.tabBarUl.offsetWidth >= this.screenWidth) {
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
                e.stopPropagation();
                this.startX = e.touches[0].clientX;
                this.lastTime = Date.now();
            });
            this.$refs.tabBarUl.addEventListener('touchmove', (e) => {
                e.stopPropagation();
                this.endX = e.touches[0].clientX;
                this.distanceX = this.startX - this.endX;
                this.translateX = this.currentX - this.distanceX;
                if (this.$refs.tabBarUl.offsetWidth >= this.screenWidth) {
                    this.removeTransition(this.$refs.tabBarUl);
                    this.changeTranslateX(this.$refs.tabBarUl, this.translateX);
                    if (this.translateX > this.whiteLength) {
                        this.changeTranslateX(this.$refs.tabBarUl, this.whiteLength);
                    } else if (this.translateX < -(this.$refs.tabBarUl.offsetWidth + this.whiteLength - this.screenWidth)) {
                        this.changeTranslateX(this.$refs.tabBarUl, -(this.$refs.tabBarUl.offsetWidth + this.whiteLength - this.screenWidth));
                    }
                }
            });
            this.$refs.tabBarUl.addEventListener('touchend', (e) => {
                e.stopPropagation();
                this.timeDis = Date.now() - this.lastTime;
                if (this.timeDis > 300) {
                    this.speed = 0;
                } else {
                    this.speed = parseInt(this.distanceX / this.timeDis * 150);
                }
                this.translateX -= this.speed;
                if (this.translateX > 0) {
                    this.translateX = 0;
                    this.currentX = 0;
                } else if ((-(this.$refs.tabBarUl.offsetWidth - this.screenWidth)) < this.translateX && this.translateX < 0) {
                    this.currentX = this.translateX;
                } else if (this.translateX < -(this.$refs.tabBarUl.offsetWidth - this.screenWidth)) {
                    this.translateX = -(this.$refs.tabBarUl.offsetWidth - this.screenWidth);
                    this.currentX = -(this.$refs.tabBarUl.offsetWidth - this.screenWidth);
                }
                if (this.$refs.tabBarUl.offsetWidth >= this.screenWidth) {
                    this.addTransition(this.$refs.tabBarUl);
                    this.changeTranslateX(this.$refs.tabBarUl, this.translateX);
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
    }

    #tabbar .tabbar-ul span {
        background-color: skyblue;
        position: absolute;
        z-index: 1;
        left: 0;
        bottom: 0;
    }
</style>
