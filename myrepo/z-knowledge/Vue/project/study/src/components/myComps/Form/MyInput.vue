<template>
  <div>
      <!-- $attrs是子组件传递的属性（除了用props接收了的属性和class/style属性） -->
      <!-- v-bind:'$attrs'会自己展开，成为类似于type='text' aa='123'这样的属性 -->
    <input :value="value" @input="onInput($event)" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inject: ['form'],
  inheritAttrs: false, // 是否继承属性，如果继承，那么父级都会有此属性，否则只有自己有此属性
  props: {
    value: {
      type: String
    },
    aaa: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onInput (e) {
      this.$emit('input', e.target.value)
    }
  },
  mounted () {
    console.log(this.$attrs)
    console.log(this.form)
  }
}
</script>

<style>
</style>
