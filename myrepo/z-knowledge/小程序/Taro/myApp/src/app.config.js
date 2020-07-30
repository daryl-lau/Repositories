export default {
  pages: [
    'pages/index/index',
    'pages/category/index',
    'pages/cart/index',
    'pages/home/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ea4451',
    navigationBarTitleText: '优购',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    selectedColor: '#ea4451',
    list: [{
      pagePath: "pages/index/index",
      text: "首页",
      iconPath: "./assets/tabs/icon_home@3x.png",
      selectedIconPath: "./assets/tabs/icon_home_active@3x.png"
    }, {
      pagePath: "pages/category/index",
      text: "分类",
      iconPath: "./assets/tabs/icon_category@3x.png",
      selectedIconPath: "./assets/tabs/icon_category_active@3x.png"
    }, {
      pagePath: "pages/cart/index",
      text: "购物车",
      iconPath: "./assets/tabs/icon_cart@3x.png",
      selectedIconPath: "./assets/tabs/icon_cart_active@3x.png"
    }, {
      pagePath: "pages/home/index",
      text: "我的",
      iconPath: "./assets/tabs/icon_user@3x.png",
      selectedIconPath: "./assets/tabs/icon_user_active@3x.png"
    }
    ]
  },
  sitemapLocation: "../sitemap.json"
}
