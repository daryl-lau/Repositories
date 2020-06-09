<template>
  <form style="margin-top: 20px">
    <div class="form-group">
      <label for="heroid">英雄ID</label>
      <input class="form-control" id="heroid" v-model="id" disabled />
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
    <div class="form-group">
      <label for="time">创建时间</label>
      <input class="form-control" id="time" v-model="createTime" />
      <small class="form-text text-muted">格式：1990/10/10 10:10:10</small>
    </div>

    <button class="btn btn-success" @click.prevent="saveChange()" style="margin-right: 20px">保存</button>
    <button class="btn btn-danger" @click.prevent="$router.go(-1)">取消</button>
  </form>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            id: '',
            heroName: '',
            heroGender: '男',
            createTime: ''
        }
    },
    created() {
        let id = this.$route.params.id
        this.$axios.get(`http://localhost:3000/hero/${id}`).then(res => {
            this.id = res.data.id
            this.heroName = res.data.heroName
            this.heroGender = res.data.heroGender
            this.createTime = moment(res.data.createTime).format('YYYY-MM-DD hh:mm:ss')
        })
    },
    methods: {
        saveChange() {
            if (!this.id) return alert('id不能为空')
            if (!this.heroName) return alert('英雄名字不能为空')
            if (!this.heroGender) return alert('性别不能为空')
            if (!this.createTime) return alert('创建时间不能为空')
            this.$axios
                .put(`http://localhost:3000/hero/${this.id}`, {
                    id: parseInt(this.id),
                    heroName: this.heroName.trim(),
                    heroGender: this.heroGender,
                    createTime: this.createTime.trim()
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