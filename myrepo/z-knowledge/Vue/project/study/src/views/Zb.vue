<template>
  <div>
    <div class="col">
      <span class="navbar-brand mb-0 h1 header">装备列表案例</span>
    </div>
    <svg>
      <use xlink:href="#icon-wx" />
    </svg>
    <svg>
      <use xlink:href="#icon-qq" />
    </svg>
    <SvgIcon icon-class="wx" class="header"></SvgIcon>
  </div>
</template>

<script>
// import '@/icons/svgs/wx.svg'
// import '@/icons/svgs/qq.svg'
import SvgIcon from '@/components/icons/SvgIcon'
export default {
  methods: {
    request() {
      this.$axios.get('/api/getUsers').then(res => {
        console.log(res)
      })
    }
  },
  created() {
    this.request()
  },
  components: {
    SvgIcon
  }
}
</script>

<style lang="less" scoped>
.header {
  margin-bottom: 15px;
  color: @globalColor;
}
</style>
