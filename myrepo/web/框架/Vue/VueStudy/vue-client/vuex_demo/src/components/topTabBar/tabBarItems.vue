<template>
    <li v-text="value.title" @click="toggleActive(index); toggleTag(index)" :style="active" ref="li"></li>
    <!--    <li v-text="value.title" @click="toggleActive(index); toggleTag(index)" :class="{current: value.isActive}" ref="li"></li>-->
</template>

<script>
    export default {
        name: "tabBarItems",
        props:
            {
                value: Object,
                index: Number,
                toggleActive: Function,
                moveTagStyle: Object,
                listItemStyle: Object,
                activeFontColor: Object,
                noActiveFontColor:Object
            },
        // data() {
        //     return {
        //         activeColor: 'skyblue',
        //         noActiveColor: '#6c6c6c'
        //     }
        // },
        methods: {
            toggleTag(index) {
                this.$emit('toggleMoveTag', index)
            }
        },
        computed: {
            active: function () {
                // this.value.isActive ? this.activeColor = 'skyblue' : this.activeColor = '';
                // return {
                //     color: this.activeColor
                // }
                // console.log(value);
                if (this.value.isActive) {
                    return {color: this.activeFontColor.color}
                } else {
                    return {color: this.noActiveFontColor.color}
                }
            }
        },
        beforeMount() {

        },
        mounted() {
            this.$refs.li.style.width = this.listItemStyle.width + 'px';
            this.$refs.li.style.height = this.listItemStyle.height + 'px';
            this.$refs.li.style.lineHeight = this.listItemStyle.height + 'px';
            this.$refs.li.style.fontSize = this.listItemStyle.fontSize + 'px';
        }
    }
</script>

<style scoped>

</style>
