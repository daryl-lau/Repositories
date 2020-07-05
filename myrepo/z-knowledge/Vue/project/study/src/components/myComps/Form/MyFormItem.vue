<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="errorMsg">{{errorMsg}}</p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String
    },
    errorMsg: {
      type: String
    },
    prop: {
      type: String
    }
  }
}
</script>

<style>
</style>
