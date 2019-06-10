<template>
  <div class="recommend-container" v-if="userInfo._id">
      <ul class="recommend">
          <shop-list
             tag="li"
             v-for="(item, index) in recshoplist"
             :item=item
             :key="index"
             :clickCellBtn="dealWithCellBtnClick"
          />
      </ul>
  </div>
  <select-login v-else />
</template>

<script>
  import {mapState} from 'vuex';
  import ShopList from './../../components/ShopList/ShopList';
  import SelectLogin from './../../pages/Login/SelectLogin'
  export default {
    name: "Recommend",
    mounted() {
       this.$store.dispatch('reqRecShopList', {
         'app_name': 'rectab_sim_gyl',
         'offset': 0,
         'count': 30
       }, ()=>{
         console.log('数据请求成功');
       });
    },
    computed: {
      ...mapState(['recshoplist', 'userInfo'])
    },
    components:{
      ShopList,
      SelectLogin
    },
    methods: {
      dealWithCellBtnClick(goods_id){
        console.log(goods_id);
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .recommend-container
    width 100%
    height 100%
    background #f5f5f5
    .recommend
      display flex
      flex-direction row
      flex-wrap wrap
      background-color: #f5f5f5;
      padding-bottom 5rem
</style>
