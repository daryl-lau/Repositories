<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table :data="rightList" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="100px"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template v-slot:default="prop">
            <el-tag :type="mapType(prop.row.level)">{{mapLevel(prop.row.level)}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRightList } from '@/api'
export default {
  data() {
    return {
      rightList: []
    }
  },
  methods: {
    async getRightList() {
      let { data } = await getRightList('list')
      this.rightList = data.data
    },
    mapLevel(level) {
      switch (level) {
        case '0':
          return '一级'
        case '1':
          return '二级'
        case '2':
          return '三级'
      }
    },
    mapType(level) {
      switch (level) {
        case '0':
          return 'primary'
        case '1':
          return 'success'
        case '2':
          return 'warning'
      }
    }
  },

  created() {
    this.getRightList()
  }
}
</script>

<style>
</style>