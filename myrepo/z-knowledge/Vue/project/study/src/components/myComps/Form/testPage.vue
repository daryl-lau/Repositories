<template>
  <div>
    <MyForm :model="form">
      <MyFormItem label="用户名">
        <MyInput v-model="form.username"></MyInput>
      </MyFormItem>
      <MyFormItem label="密码">
        <MyInput v-model="form.password" type="password"></MyInput>

        <!-- v-model实际上是:value 和 @input的语法糖 -->
        <!-- <MyInput :value="form.password" type="password" @input="form.password=$event"></MyInput> -->
      </MyFormItem>
    </MyForm>
    {{form}}
  </div>
</template>

<script>
import MyInput from './MyInput'
import MyFormItem from './MyFormItem'
import MyForm from './MyForm'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    MyInput,
    MyFormItem,
    MyForm
  }
}
</script>

<style>
</style>
