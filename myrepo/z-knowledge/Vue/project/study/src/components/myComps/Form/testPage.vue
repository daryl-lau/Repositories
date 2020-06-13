<template>
  <div>
    <MyForm :model='form'>
      <MyFormItem label="用户名">
        <MyInput v-model="form.username"></MyInput>
      </MyFormItem>
      <MyFormItem label="密码">
        <MyInput v-model="form.password" type="password"></MyInput>
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
    data() {
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