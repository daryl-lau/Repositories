<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-button type="primary" @click="addCateDia()">添加分类</el-button>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="cat_id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :indent="26"
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
      >
        <el-table-column prop="cat_name" label="分类名称"></el-table-column>
        <el-table-column label="是否有效">
          <template v-slot="prop">
            <i class="el-icon-success" v-if="!prop.row.cat_deleted" style="color: lightgreen"></i>
            <i class="el-icon-error" v-else style="color: red"></i>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template v-slot="prop">
            <el-tag :type="mapType(prop.row.cat_level)">{{mapLevel(prop.row.cat_level)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="prop">
            <el-button size="mini" type="primary" @click="modifyCate(prop.row.cat_id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delCate(prop.row.cat_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog :visible.sync="dialogModifyCateVisiable" title="修改分类名称">
      <p>分类名称：</p>
      <el-input v-model="cate_name" autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModifyCateVisiable = false">取 消</el-button>
        <el-button type="primary" @click="modifyCateName()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加分类" :visible.sync="dialogAddCateVisible" @close="addCateDialogClosed()">
      <el-form :model="addCateForm" :rules="addCateRules" ref="addCateForm">
        <el-form-item label="分类名称" label-width="100px" prop="cat_name">
          <el-input v-model="addCateForm.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" label-width="100px">
          <el-cascader v-model="value" :options="options" :props="{ expandTrigger: 'hover', label: 'cat_name', value: 'cat_id',checkStrictly: true }" @change="handleChange" clearable></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddCateVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCateList,
  getCateById,
  changeCateName,
  addCate,
  deleteCate
} from '@/api'
export default {
  data() {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      addCateForm: {
        cat_name: '',
        cat_level: 0,
        cat_pid: 0
      },
      value: [],
      options: [],
      total: 0,
      tableData: [],
      dialogModifyCateVisiable: false,
      dialogAddCateVisible: false,
      cate_name: '',
      cate_id: '',
      tableLoading: true,
      addCateRules: {
        cat_name: [
          {
            required: true,
            message: '分类名称不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async getCateList() {
      const { data } = await getCateList({ params: this.queryInfo })
      if (data.data) {
        this.total = data.data.total
        this.tableData = data.data.result
        this.tableLoading = false
      }
    },
    mapLevel(level) {
      switch (level) {
        case 0:
          return '一级'
        case 1:
          return '二级'
        case 2:
          return '三级'
      }
    },
    mapType(level) {
      switch (level) {
        case 0:
          return 'primary'
        case 1:
          return 'success'
        case 2:
          return 'warning'
      }
    },
    // 分页器修改每页显示条数处理函数
    handleSizeChange(val) {
      this.tableLoading = true
      this.queryInfo.pagesize = val
      this.getCateList()
    },
    // 分页器分页处理函数
    handleCurrentChange(val) {
      this.tableLoading = true
      this.queryInfo.pagenum = val
      this.getCateList()
    },
    async modifyCate(id) {
      const { data } = await getCateById(id)
      console.log(data)
      this.cate_name = data.data.cat_name
      this.cate_id = data.data.cat_id
      this.dialogModifyCateVisiable = true
    },
    async modifyCateName() {
      if (!this.cate_name) {
        this.$message.error('分类名称不能为空！')
      }

      // console.log(this.cate_name, this.cate_id);
      const { data } = await changeCateName(this.cate_id, {
        cat_name: this.cate_name
      })

      if (data.meta.status !== 200) {
        this.$message.error('修改商品分类名称失败！')
      } else {
        this.$message.success('修改商品分类名称成功！')
        this.getCateList()
      }

      this.dialogModifyCateVisiable = false
    },
    addCate() {
      this.$refs.addCateForm.validate(async valid => {
        if (valid) {
          console.log('cat_pid', this.addCateForm.cat_pid)
          console.log('cat_level', this.addCateForm.cat_level)
          console.log('cat_name', this.addCateForm.cat_name)

          const { data } = await addCate(this.addCateForm)
          console.log(data)
          if (data.meta.status !== 201) {
            this.$message.error('创建分类失败！')
          } else {
            this.$message.success('创建分类成功！')
            this.getCateList()
            this.dialogAddCateVisible = false
          }
        }
      })
    },
    addCateDialogClosed() {
      this.value = []
      this.addCateForm.cat_name = ''
      this.$refs.addCateForm.resetFields()
    },
    async addCateDia() {
      const { data } = await getCateList({
        params: { type: 2 }
      })
      console.log(data)
      this.options = data.data
      this.dialogAddCateVisible = true
    },
    handleChange(value) {
      if (value.length == 0) {
        this.addCateForm.cat_pid = 0
      } else {
        this.addCateForm.cat_pid = this.value[this.value.length - 1]
      }
      this.addCateForm.cat_level = this.value.length
    },
    delCate(id) {
      console.log(id)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await deleteCate(id)
          if (data.meta.status == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getCateList()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
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
    this.getCateList()
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 20px;
}
</style>