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
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
          <el-submenu :index="item.path" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconMap[item.id]"></i>
              <span slot="title">{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/' + child.path" v-for="child in item.children" :key="child.id" @click="setDefaultActive(child.path)">
              <i :class="iconMap[child.id]"></i>
              <span slot="title">{{child.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <el-main>
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>-->
        <!-- <el-card class="box-card"> -->
        <router-view></router-view>
        <!-- </el-card> -->
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
      // breadcrumb: [],
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
      this.defaultActive = '/' + path
      sessionStorage.setItem('defaultActive', '/' + path)
    }
    // getBreadcrumb(menu, route) {
    //     if (!menu) return
    //     let res = []
    //     function search(arr, path) {
    //         arr.forEach(item => {
    //             if (item.children.length > 0) {
    //                 res.push(item.authName)
    //                 let index = res.indexOf(item.authName)
    //                 item.children.forEach(item => {
    //                     if (item.path == path) {
    //                         res[index] += '/' + item.authName
    //                     }
    //                 })
    //                 search(item.children, path)
    //             }
    //         })
    //     }
    //     search(menu, route)
    //     let result = res.filter(item => item.includes('/'))
    //     if (result.length) {
    //         return result[0].split('/')
    //     } else {
    //         return []
    //     }
    // },
    // initBreadcrumb() {
    //     let matched = this.$route.matched.map(item =>
    //         item.path.substring(1)
    //     )
    //     let route = matched.pop()
    //     if (route == 'welcome') {
    //         this.defaultActive = ''
    //     }
    //     this.breadcrumb = this.getBreadcrumb(this.menuList, route)
    // }
  },
  created() {
    getMenus().then(res => {
      this.menuList = res.data.data
      // this.initBreadcrumb()
    })
    this.defaultActive = sessionStorage.getItem('defaultActive')
  }
  // watch: {
  //     $route: function() {
  //         this.initBreadcrumb()
  //     }
  // }
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
    .el-main {
      background-color: #f6f6f6;
      .el-breadcrumb {
        margin-bottom: 20px;
      }
      .el-card {
        box-shadow: 0 1px 1px #f6f6f6;
      }
    }
  }
}
</style>