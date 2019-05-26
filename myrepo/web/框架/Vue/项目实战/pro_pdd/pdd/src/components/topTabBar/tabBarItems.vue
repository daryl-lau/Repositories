<template>
    <li v-text="value.title" @click="toggleActive(index); toggleTag(index)" :class="{current: value.isActive}" ref="li"></li>
</template>

<script>
    export default {
        name: "tabBarItems",
        props:
            {value: Object, index: Number, toggleActive: Function, moveTag:Object, listItem:Object},
        data() {
            return {}
        },
        methods: {
            toggleTag(index){
                this.$emit('toggleMoveTag', index)
            }
        },
        mounted() {
            this.$refs.li.style.width = this.listItem.width + 'px';
            this.$refs.li.style.height = this.listItem.height + 'px';
            this.$refs.li.style.lineHeight = this.listItem.height + 'px';
            this.$refs.li.style.fontSize = this.listItem.fontSize + 'px';
            this.$refs.li.style.color = this.listItem.fontColor;
        }
    }
</script>

<style scoped>

</style>
