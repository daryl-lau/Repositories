<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 顶部搜索和添加用户按钮start -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input placeholder="请输入搜索内容" class="input-with-select" v-model="queryParams.query" :clearable="true" @clear="clearInput()">
              <el-button slot="append" icon="el-icon-search" @click="debounceSearch()"></el-button>
            </el-input>
          </div>
        </el-col>
        <!-- 添加用户按钮 -->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="dialogFormVisible=true">添加用户</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 顶部搜索和添加用户按钮end -->

      <!-- 用户列表start -->
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" label="#" width="100px"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template v-slot:default="prop">
            <el-switch v-model="prop.row.mg_state" @change="debounceChangeState(prop.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作">
          <template v-slot:default="prop">
            <el-button type="primary" icon="el-icon-edit" circle @click="getUserById(prop.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="delUser(prop.row.id)"></el-button>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-star-off" circle @click="allotRole(prop.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 用户列表end -->

      <!-- 分页器start -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 分页器end -->
    </el-card>

    <!-- 添加用户弹窗start -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" @close="resetForm('addUserForm')">
      <el-form :model="addUserForm" :rules="addUserRules" ref="addUserForm">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input v-model="addUserForm.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px" prop="email">
          <el-input v-model="addUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="100px" prop="mobile">
          <el-input v-model="addUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="debounceAddUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加用户弹窗end -->

    <!-- 修改用户信息弹窗start -->
    <el-dialog title="修改用户信息" :visible.sync="dialogModifyUserFormVisible" @close="resetForm('modifyUserForm')">
      <el-form :model="modifyUserForm" :rules="modifyUserRules" ref="modifyUserForm">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="modifyUserForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px" prop="email">
          <el-input v-model="modifyUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="100px" prop="mobile">
          <el-input v-model="modifyUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModifyUserFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="debounceModifyUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户信息弹窗end -->

    <el-dialog title="分配角色" :visible.sync="dialogAllotRoleVisible" @close="allotRoleData.selectedRolename=''">
      <p>当前用户：{{allotRoleData.username}}</p>
      <p>当前角色：{{allotRoleData.role_name}}</p>分配角色：
      <el-select v-model="allotRoleData.selectedRolename" placeholder="请选择">
        <el-option v-for="item in allotRoleData.roleList" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAllotRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="debounceAllotRoleToUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入api
import {
  getUsers,
  changeUserState,
  addUser,
  deleteUser,
  getUserById,
  modifyUserById,
  getRoles,
  allotRoleById
} from '@/api'

export default {
  data() {
    // 验证手机号函数
    let checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value))
        return callback(new Error('手机号不正确'))
      else callback()
    }

    // 验证邮箱函数
    let checkEmail = (rule, value, callback) => {
      if (
        !/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
          value
        )
      )
        return callback(new Error('邮箱格式不正确'))
      else callback()
    }

    return {
      //查询参数
      queryParams: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      userList: [],
      dialogFormVisible: false,
      dialogModifyUserFormVisible: false,
      dialogAllotRoleVisible: false,
      allotRoleData: {
        id: '',
        username: '',
        role_name: '',
        selectedRolename: '',
        roleList: []
      },
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      modifyUserForm: {
        id: 0,
        username: '',
        email: '',
        mobile: ''
      },
      // 添加用户表单验证规则
      addUserRules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          { min: 6, message: '密码不得少于6位数', trigger: 'blur' }
        ],
        email: [
          {
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },

      // 修改用户表单验证规则
      modifyUserRules: {
        email: [
          {
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 初始化函数，获取用户列表
    async init() {
      let { data } = await getUsers({ params: this.queryParams })
      if (data.data) {
        this.total = data.data.total
        this.userList = data.data.users
      }
    },

    // 分页器修改每页显示条数处理函数
    handleSizeChange(val) {
      this.queryParams.pagesize = val
      this.init()
    },
    // 分页器分页处理函数
    handleCurrentChange(val) {
      this.queryParams.pagenum = val
      this.init()
    },

    // 修改用户状态处理函数
    async changeState(mg_state) {
      let { data } = await changeUserState(mg_state.id, mg_state.mg_state)
      console.log(data)
      if (data.meta.status == 200) return this.$message.success('修改状态成功')
    },

    // 搜索框清空内容时处理函数
    clearInput() {
      this.init()
    },

    // 添加用户处理函数
    addUser() {
      // 表单验证
      this.$refs.addUserForm.validate(async valid => {
        if (valid) {
          let { data } = await addUser(this.addUserForm)
          console.log(data)
          if (data.meta.status == 201) {
            this.$message.success('添加用户成功!')
            this.dialogFormVisible = false
          } else {
            this.$message.error(data.meta.msg)
          }
        } else {
          return false
        }
      })
    },
    // 删除用户处理函数
    delUser(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let { data } = await deleteUser(id)
          if (data.meta.status == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.init()
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
    },
    // 清理验证表单的验证结果，第二次进入时就不会带有上一次验证的错误信息
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    // 通过id获取用户信息，用于修改用户
    async getUserById(id) {
      let { data } = await getUserById(id)
      console.log(data)
      this.modifyUserForm.id = data.data.id
      this.modifyUserForm.username = data.data.username
      this.modifyUserForm.email = data.data.email
      this.modifyUserForm.mobile = data.data.mobile
      this.dialogModifyUserFormVisible = true
    },

    // 通过id修改用户信息
    modifyUser() {
      this.$refs.modifyUserForm.validate(async valid => {
        if (valid) {
          console.log(this.modifyUserForm.id)
          let { data } = await modifyUserById(this.modifyUserForm.id, {
            mobile: this.modifyUserForm.mobile,
            email: this.modifyUserForm.email
          })
          if (data.meta.status == 200) {
            this.$message.success('修改用户信息成功!')
            this.init()
            this.dialogModifyUserFormVisible = false
          } else {
            this.$message.error(data.meta.msg)
          }
        } else {
          return false
        }
      })
    },
    // 搜索函数
    search() {
      // 把当前页码先设置为1，否则获取到的数据不完整
      this.queryParams.pagenum = 1
      this.init()
    },

    // 分配用户角色
    async allotRole(user) {
      this.allotRoleData.id = user.id
      this.allotRoleData.username = user.username
      this.allotRoleData.role_name = user.role_name

      const { data } = await getRoles()

      this.allotRoleData.roleList = data.data
      this.dialogAllotRoleVisible = true
    },
    async allotRoleToUser() {
      if (!this.allotRoleData.selectedRolename) {
        return this.$message.error('请选择需要分配的权限！')
      }

      const { data } = await allotRoleById(this.allotRoleData.id, {
        rid: this.allotRoleData.selectedRolename
      })

      if (data.meta.status !== 200) {
        this.$message.error('分配角色失败，请稍后再试！')
      } else {
        this.$message.success('分配角色成功！')
        this.init()
        this.dialogAllotRoleVisible = false
      }
    }
  },
  created () {
    // 组件初始化渲染
    this.init()

    // 函数防抖，避免多次请求后台接口
    this.debounceChangeState = this._.debounce(this.changeState, 300)
    this.debounceAddUser = this._.debounce(this.addUser, 300)
    this.debounceSearch = this._.debounce(this.search, 300)
    this.debounceModifyUser = this._.debounce(this.modifyUser, 300)
    this.debounceAllotRoleToUser = this._.debounce(this.allotRoleToUser, 300)
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
