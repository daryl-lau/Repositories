<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false"></el-alert>
      <el-row style="margin-top:20px">
        选择商品分类：
        <el-cascader v-model="value" :options="options" :props="{ expandTrigger: 'hover', label: 'cat_name', value: 'cat_id', }" @change="handleChange"></el-cascader>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many"></el-tab-pane>
        <el-tab-pane label="静态属性" name="only"></el-tab-pane>
      </el-tabs>
      <div>
        <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="dialogVisible=true">{{this.activeName=='many'? '添加参数':'添加属性'}}</el-button>
        <el-table :data="tableData" border style="width: 100%; margin-top: 15px">
          <el-table-column type="expand">
            <template v-slot="prop">
              <el-tag :key="index" v-for="(tag,index) in prop.row.attr_vals" closable :disable-transitions="false" @close="handleClose(prop.row, index)">{{tag}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="prop.row.inputVisible"
                v-model="prop.row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(prop.row)"
                @blur="handleInputConfirm(prop.row)"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(prop.row)">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column type="index" label="ID" width="100px"></el-table-column>
          <el-table-column prop="attr_name" label="属性名称"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="prop">
              <el-button type="primary" size="mini" @click="modify(prop.row.cat_id, prop.row.attr_id)">编辑</el-button>
              <el-button type="danger" size="mini" @click="delAttr(prop.row.cat_id, prop.row.attr_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog :title="'添加'+ titleText" :visible.sync="dialogVisible" width="40%" @closed="resetForm('addForm')">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAttr()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="'编辑'+ titleText" :visible.sync="dialogModifyVisible" width="40%" @closed="resetForm('modifyForm')">
      <el-form :model="modifyForm" :rules="modifyRules" ref="modifyForm" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="modifyForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogModifyVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyAttr()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCateList,
  getAttributes,
  addAttribute,
  deleteAttribute,
  getAttrById,
  modifyAttribute
} from '@/api'
export default {
  data() {
    return {
      value: [],
      options: [],
      activeName: 'many',
      tableData: [],
      dialogVisible: false,
      dialogModifyVisible: false,
      addForm: {
        attr_name: ''
      },
      modifyForm: {
        attr_name: '',
        cat_id: '',
        attr_id: ''
      },
      rules: {
        attr_name: [
          {
            required: true,
            message: '参数不能为空！',
            trigger: 'blur'
          }
        ]
      },
      modifyRules: {
        attr_name: [
          {
            required: true,
            message: '参数不能为空！',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async init() {
      const { data } = await getCateList()
      if (data.data) {
        this.options = data.data
      }
    },
    handleTabClick() {
      this.getAttr()
    },
    handleChange() {
      this.getAttr()
    },
    async getAttr() {
      if (this.value.length !== 3) {
        this.value = []
        this.tableData = []
        return
      }
      const { data } = await getAttributes(
        this.value[this.value.length - 1],
        this.activeName
      )
      data.data.forEach(item => {
        if (!item.attr_vals) {
          item.attr_vals = []
        } else {
          item.attr_vals = item.attr_vals.trim().split(',')
        }
        Object.assign(item, { inputVisible: false })
        Object.assign(item, { inputValue: '' })
      })
      this.tableData = data.data
    },
    resetForm(form) {
      this.$refs[form].resetFields()
    },
    async addAttr() {
      const { data } = await addAttribute(this.value[this.value.length - 1], {
        ...this.addForm,
        attr_sel: this.activeName
      })
      if (data.data) {
        this.$message.success('添加参数成功！')
        this.getAttr()
        this.dialogVisible = false
      }
    },
    async delAttr(cat_id, attr_id) {
      this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await deleteAttribute(cat_id, attr_id)
          if (data.meta.status == 200) {
            this.$message.success('删除参数成功！')
            this.getAttr()
          } else {
            this.$message.error('删除参数失败！')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async modify(cat_id, attr_id) {
      const { data } = await getAttrById(cat_id, attr_id, this.activeName)
      if (data.data) {
        this.modifyForm.attr_name = data.data.attr_name
        this.modifyForm.attr_id = data.data.attr_id
        this.modifyForm.cat_id = data.data.cat_id
        this.dialogModifyVisible = true
      }
    },
    async modifyAttr() {
      const { data } = await modifyAttribute(
        this.modifyForm.cat_id,
        this.modifyForm.attr_id,
        {
          attr_name: this.modifyForm.attr_name,
          attr_sel: this.activeName
        }
      )
      if (data.meta.status == 200) {
        this.$message.success('修改参数成功！')
        this.getAttr()
        this.dialogModifyVisible = false
      } else {
        this.$message.error('修改参数失败！')
      }
    },
    async handleInputConfirm(row) {
      if (!row.inputValue.trim()) {
        row.inputVisible = false
        return
      }
      if (row.attr_vals.indexOf(row.inputValue) !== -1) {
        this.$message.error('已有重复参数，请勿重复提交！')
        row.inputVisible = false
        return
      }
      row.attr_vals.push(row.inputValue)
      const { data } = await modifyAttribute(row.cat_id, row.attr_id, {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(',')
      })
      if (data.meta.status !== 200) {
        this.$message.error('添加参数失败！')
      } else {
        this.$message.success('添加参数成功！')
        row.attr_vals = data.data.attr_vals.trim().split(',')
      }
      row.inputValue = ''
      row.inputVisible = false
    },
    showInput(row) {
      row.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async handleClose(row, index) {
      let valsCopy = this._.cloneDeep(row.attr_vals)
      valsCopy.splice(index, 1)
      const { data } = await modifyAttribute(row.cat_id, row.attr_id, {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: valsCopy.join(',')
      })
      if (data.meta.status !== 200) {
        this.$message.error('删除参数失败！')
      } else {
        this.$message.success('删除参数成功！')
        row.attr_vals =
          data.data.attr_vals == '' ? [] : data.data.attr_vals.split(',')
      }
    }
  },
  created() {
    this.init()
  },
  computed: {
    isBtnDisabled() {
      if (this.value.length !== 3) {
        return true
      }
      return false
    },
    titleText() {
      if (this.activeName == 'many') {
        return '动态参数'
      } else {
        return '静态属性'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

</style>