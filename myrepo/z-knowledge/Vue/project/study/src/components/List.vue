<template>
  <div>
    <table class="table table-hover heroTable">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">英雄</th>
          <th scope="col">性别</th>
          <th scope="col">创建时间</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in heros" :key="item.id">
          <th scope="row">{{item.id}}</th>
          <td>{{item.heroName}}</td>
          <td>{{item.heroGender}}</td>
          <td>{{item.createTime | formatDate}}</td>
          <td>
            <button
              class="btn btn-success"
              style="margin-right: 10px"
              @click="$router.push({name: 'edit', params: {id: item.id}})"
            >编辑</button>
            <button class="btn btn-danger" @click="delHero(item.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            heros: []
        }
    },
    created() {
        this.getHeros()
    },
    methods: {
        delHero(id) {
            if (confirm('确定删除该英雄吗？')) {
                this.$axios
                    .delete(`http://localhost:3000/hero/${id}`)
                    .then(res => {
                        this.getHeros()
                    })
            }
        },
        getHeros() {
            this.$axios.get('http://localhost:3000/hero').then(res => {
                this.heros = res.data
            })
        }
    },
    filters: {
        formatDate(date) {
            return moment(date).format('YYYY-MM-DD hh:mm:ss')
        }
    }
}
</script>

<style>
</style>