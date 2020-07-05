<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryParams.query" clearable @clear="search()">
            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="$router.push('/goods/add')">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border>
        <el-table-column type="index" label="#" width="80"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="130"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="130"></el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="200">
          <template v-slot="prop">{{prop.row.add_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template v-slot="prop">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delGood(prop.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 15px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pagenum"
        :page-sizes="[5,10,15,20]"
        :page-size="queryParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getGoods, deleteGood } from '@/api'
export default {
  data() {
    return {
      queryParams: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      userList: []
    }
  },
  methods: {
    async init() {
      const { data } = await getGoods(this.queryParams)
      if (data.meta.status !== 200) {
        this.$message.error('获取商品列表失败！')
      } else {
        this.userList = data.data.goods
        this.total = data.data.total
      }
      console.log(data)
    },
    handleSizeChange(val) {
      this.queryParams.pagenum = 1
      this.queryParams.pagesize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.queryParams.pagenum = val
      this.init()
    },
    search() {
      this.queryParams.pagenum = 1
      this.init()
    },
    delGood(id) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await deleteGood(id)
          if (data.meta.status !== 200) {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          } else {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.init()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}

.el-pagination {
  margin-top: 10px;
}
</style>