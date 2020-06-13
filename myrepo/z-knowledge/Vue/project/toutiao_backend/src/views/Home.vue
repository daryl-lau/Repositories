<template>
  <el-container class="layout">
    <el-header>
      <div class="brand">
        <img src="../assets/imgs/brand.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="primary" @click="logout()">退出</el-button>
    </el-header>
    <el-container>
      <div class="el-aside" onselectstart="return false">
        <el-radio-group v-model="isCollapse">
          <el-radio-button v-show="isCollapse" :label="false">
            <i class="el-icon-s-unfold"></i>
          </el-radio-button>
          <el-radio-button v-show="!isCollapse" :label="true">
            <i class="el-icon-s-fold"></i>
          </el-radio-button>
        </el-radio-group>
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-submenu :index="item.path" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconMap[item.id]"></i>
              <span slot="title">{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="child.path"
              v-for="child in item.children"
              :key="child.id"
              @click="setDefaultActive(child.path)"
            >
              <i :class="iconMap[child.id]"></i>
              <span slot="title">{{child.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenus } from '@/api/'
export default {
    data() {
        return {
            defaultActive: '',
            isCollapse: false,
            menuList: [],
            iconMap: {
                '125': 'el-icon-user-solid',
                '103': 'el-icon-s-claim',
                '101': 'el-icon-s-goods',
                '102': 'el-icon-s-order',
                '145': 'el-icon-s-marketing',
                '110': 'el-icon-user',
                '111': 'el-icon-s-custom',
                '112': 'el-icon-postcard',
                '104': 'el-icon-goods',
                '115': 'el-icon-sell',
                '121': 'el-icon-box',
                '107': 'el-icon-tickets',
                '146': 'el-icon-pie-chart'
            }
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token')
            this.$router.push('/login')
        },
        setDefaultActive(path) {
            this.defaultActive = path
            sessionStorage.setItem('defaultActive', path)
        }
    },
    created() {
        getMenus().then(res => {
            this.menuList = res.data.data
        })
        this.defaultActive = sessionStorage.getItem('defaultActive')
    }
}
</script>

<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.layout {
    height: 100vh;
    .el-header {
        width: 100vw;
        position: absolute;
        left: 0;
        top: 0;
        margin: 0;
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .brand {
            display: flex;
            align-items: center;
            img {
                width: 50px;
            }
            span {
                margin-left: 10px;
                font-size: 24px;
                color: #ffffff;
            }
        }
        .el-button {
            height: 40px;
        }
    }
    .el-container {
        height: 100%;
        padding-top: 60px;
        .el-aside {
            background-color: rgb(84, 92, 100);
            overflow: auto;
            .el-menu {
                border: none;
            }
            .el-radio-group {
                width: 100%;
                border: none;
                cursor: pointer;
                .el-radio-button {
                    width: 100%;
                    cursor: pointer;
                    /deep/ .el-radio-button__inner {
                        background-color: rgb(84, 92, 100);
                        border: none;
                        border-radius: 0;
                        i {
                            font-size: 24px;
                            color: #909399;
                        }
                    }
                }
            }
        }
    }
}
</style>