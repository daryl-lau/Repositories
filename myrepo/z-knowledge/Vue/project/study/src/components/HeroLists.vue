<template>
  <div class="col-md-10">
    <router-link class="btn btn-info" to="/hero/add">新增英雄</router-link>
    <!-- 英雄列表的二级路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style>
.heroTable {
    margin-top: 10px;
}
</style>