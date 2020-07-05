<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col>
          <el-button type="primary" @click="dialogAddRoleFormVisible=true">添加角色</el-button>
          <el-table :data="roleList" style="width: 100%;margin: 15px 0;" border>
            <el-table-column type="expand" width="80px">
              <template v-slot:default="prop">
                <el-row v-for="(item1, index1) in prop.row.children" :class="['border-bottom', index1 === 0 ? 'border-top' : '']" :key="item1.id" align="middle" type="flex">
                  <el-col :span="5">
                    <el-tag closable @close="removeRightById(prop.row, item1.id)">{{item1.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="19">
                    <el-row v-for="(item2, index2) in item1.children" :key="item2.id" align="middle" type="flex" :class="[index2 === item1.children.length - 1 ? '' : 'border-bottom']">
                      <el-col :span="6">
                        <el-tag type="success" closable @close="removeRightById(prop.row, item2.id)">{{item2.authName}}</el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <el-col :span="18">
                        <el-tag v-for="item3 in item2.children" :key="item3.id" type="warning" closable @close="removeRightById(prop.row, item3.id)">{{item3.authName}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" width="80px"></el-table-column>
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
            <el-table-column label="操作">
              <template v-slot:default="prop">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="modifyRoleById(prop.row.id)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="delRole(prop.row.id)">删除</el-button>
                <el-button type="warning" icon="el-icon-star-off" size="mini" @click="getRightTree(prop.row)">分配权限</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="添加角色" :visible.sync="dialogAddRoleFormVisible" @close="resetForm('addRoleForm')">
      <el-form :model="addRoleForm" :rules="addRoleRules" ref="addRoleForm">
        <el-form-item label="角色名称" label-width="100px" prop="roleName">
          <el-input v-model="addRoleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100px">
          <el-input v-model="addRoleForm.roleDesc" autocomplete="off" placeholder="没有可不填"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="debounceAddRole()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改角色信息" :visible.sync="dialogModifyRoleFormVisible" @close="resetForm('modifyRoleForm')">
      <el-form :model="modifyRoleForm" :rules="modifyRoleRules" ref="modifyRoleForm">
        <el-form-item label="角色ID" label-width="100px">
          <el-input v-model="modifyRoleForm.roleId" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称" label-width="100px" prop="roleName">
          <el-input v-model="modifyRoleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100px">
          <el-input v-model="modifyRoleForm.roleDesc" autocomplete="off" placeholder="没有可不填"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModifyRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyRole()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配权限" :visible.sync="dialogRightsVisible" class="allot">
      <el-tree :data="rightTree" :props="treeProps" show-checkbox :default-expand-all="true" node-key="id" :default-checked-keys="defaultCheckKey" ref="rightsTree"></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRightsVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoles,
  addRole,
  deleteRole,
  getRoleById,
  modifyRoleById,
  removeRoleById,
  getRightList,
  allotRightsToRole
} from '@/api'
export default {
  data() {
    return {
      roleList: [],
      rightTree: [],
      defaultCheckKey: [],
      roleId: '',
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      modifyRoleForm: {
        roleId: '',
        roleName: '',
        roleDesc: ''
      },
      dialogAddRoleFormVisible: false,
      dialogModifyRoleFormVisible: false,
      dialogRightsVisible: false,
      addRoleRules: {
        roleName: [
          {
            required: true,
            message: '角色名不能为空',
            trigger: 'blur'
          }
        ]
      },
      modifyRoleRules: {
        roleName: [
          {
            required: true,
            message: '角色名不能为空',
            trigger: 'blur'
          }
        ]
      },
      treeProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    async getRoles() {
      let { data } = await getRoles()
      if (data.data) {
        this.roleList = data.data
      }
    },
    addRole() {
      this.$refs.addRoleForm.validate(async valid => {
        if (valid) {
          let { data } = await addRole(this.addRoleForm)
          if (data.meta.status !== 201) {
            return this.$message.error('添加角色失败！')
          } else {
            this.$message.success('添加角色成功！')
            this.getRoles()
            this.dialogAddRoleFormVisible = false
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    delRole(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let { data } = await deleteRole(id)
          if (data.meta.status == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getRoles()
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
    async modifyRoleById(id) {
      let { data } = await getRoleById(id)
      if (data.meta.status !== 200) {
        return this.$message.error('获取角色失败！')
      }
      this.modifyRoleForm.roleId = data.data.roleId
      this.modifyRoleForm.roleName = data.data.roleName
      this.modifyRoleForm.roleDesc = data.data.roleDesc
      this.dialogModifyRoleFormVisible = true
    },
    modifyRole() {
      this.$refs.modifyRoleForm.validate(async valid => {
        if (valid) {
          console.log(this.modifyRoleForm.roleId)
          let { data } = await modifyRoleById(this.modifyRoleForm.roleId, {
            roleName: this.modifyRoleForm.roleName,
            roleDesc: this.modifyRoleForm.roleDesc
          })
          console.log(data)
          if (data.meta.status == 200) {
            this.$message.success('修改角色信息成功!')
            this.getRoles()
            this.dialogModifyRoleFormVisible = false
          } else {
            this.$message.error(data.meta.msg)
          }
        } else {
          return false
        }
      })
    },
    async removeRightById(role, rightId) {
      let { data } = await removeRoleById(role.id, rightId)
      if (data.meta.status !== 200) {
        this.$message.error('删除权限失败！')
      }
      role.children = data.data
    },
    async getRightTree(role) {
      let { data } = await getRightList('tree')
      this.rightTree = data.data
      this.defaultCheckKey = []
      this.getDefaultCheckKey(role.children)
      this.roleId = role.id
      this.dialogRightsVisible = true
    },
    getDefaultCheckKey(arr) {
      arr.forEach(item => {
        if (!item.children) {
          this.defaultCheckKey.push(item.id)
        } else {
          this.getDefaultCheckKey(item.children)
        }
      })
    },
    async allotRights() {
      const keys = [
        ...this.$refs.rightsTree.getCheckedKeys(),
        ...this.$refs.rightsTree.getHalfCheckedKeys()
      ]
      console.log(this.roleId)
      let { data } = await allotRightsToRole(this.roleId, {
        rids: keys.join(',')
      })
      if (data.meta.status !== 200) {
        this.$message.error('分配权限失败！')
      } else {
        this.$message.success('分配权限成功')
      }
      this.getRoles()
      this.dialogRightsVisible = false
    }
  },
  created() {
    this.getRoles()
    this.debounceAddRole = this._.debounce(this.addRole, 300)
    this.debounceModifyRole = this._.debounce(this.modifyRole, 300)
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 10px;
}
.border-top {
  border-top: 1px solid #eeeeee;
}

.border-bottom {
  border-bottom: 1px solid #eeeeee;
}

.allot {
  /deep/ .el-dialog {
    height: 80vh;
    overflow: auto;
  }
}
</style>