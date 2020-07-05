<template>
  <el-container>
    <el-header><div class="brand">
        <img src="../assets/imgs/brand.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="primary" @click="logout()">退出</el-button></el-header>
    <el-container>
      <el-aside width="200px">
        <nuxt-link :to="{path: '/admin'}">admin</nuxt-link>
        <nuxt-link :to="{path: '/goods'}">goods</nuxt-link>
        <nuxt-link :to="{path: '/categroies/params'}">/categroies/params</nuxt-link>
      </el-aside>
      <el-main>
        <nuxt/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
