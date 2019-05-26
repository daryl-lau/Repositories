<template>
    <li v-text="value.title" @click="toggleActive(index); toggleTag(index)" :style="active" ref="li"></li>
<!--    <li v-text="value.title" @click="toggleActive(index); toggleTag(index)" :class="{current: value.isActive}" ref="li"></li>-->
</template>

<script>
    export default {
        name: "tabBarItems",
        props:
            {value: Object, index: Number, toggleActive: Function, moveTag: Object, listItem: Object},
        data() {
            return {
                activeColor: 'skyblue',
                noActiveColor: '#6c6c6c'
            }
        },
        methods: {
            toggleTag(index) {
                this.$emit('toggleMoveTag', index)
            }
        },
        computed: {
            active:  function() {
                // this.value.isActive ? this.activeColor = 'skyblue' : this.activeColor = '';
                // return {
                //     color: this.activeColor
                // }
                // console.log(value);
                if(this.value.isActive){
                    return {color: this.activeColor}
                }else {
                    return {color: this.noActiveColor}
                }
            }
        },
        beforeMount(){

        },
        mounted() {
            this.$refs.li.style.width = this.listItem.width + 'px';
            this.$refs.li.style.height = this.listItem.height + 'px';
            this.$refs.li.style.lineHeight = this.listItem.height + 'px';
            this.$refs.li.style.fontSize = this.listItem.fontSize + 'px';
        }
    }
</script>

<style scoped>

</style>
