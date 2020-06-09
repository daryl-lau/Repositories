<template>
  <form style="margin-top: 20px">
    <div class="form-group">
      <label for="id">英雄ID</label>
      <input class="form-control" id="id" v-model="id" />
    </div>
    <div class="form-group">
      <label for="name">英雄名称</label>
      <input class="form-control" id="name" v-model="heroName" />
    </div>
    <div class="form-group">
      <label for="inputState">英雄性别</label>
      <select id="inputState" class="form-control" v-model="heroGender">
        <option>男</option>
        <option>女</option>
      </select>
    </div>
    <button class="btn btn-success" @click.prevent="addHero()" style="margin-right: 20px">提交</button>
    <button class="btn btn-danger" @click.prevent="$router.go(-1)">取消</button>
  </form>
</template>

<script>
export default {
    data() {
        return {
            id: '',
            heroName: '',
            heroGender: '男',
        }
    },
    methods: {
        addHero() {
            if (!this.id) return alert('id不能为空')
            if (!this.heroName) return alert('英雄名字不能为空')
            if (!this.heroGender) return alert('性别不能为空')
            this.$axios
                .post('http://localhost:3000/hero', {
                    id: parseInt(this.id),
                    heroName: this.heroName.trim(),
                    heroGender: this.heroGender,
                    createTime: new Date()
                })
                .then(res => {
                    this.id = ''
                    this.heroName = ''
                    this.heroGender = '男'
                    this.createTime = ''
                    this.$router.push('/hero/list')
                })
                .catch(err => {
                    alert('添加失败，请检查数据')
                })
        }
    }
}
</script>

<style>
</style>