const path = require('path')

module.exports = {
  lintOnSave: false,

  devServer: {
    // 假如接口地址是https://www.baihuzi.com/api/getInfo
    proxy: {
      '/api': {
        // /api 属性声明axios中url以/api开头的请求都适用于该规则，例如axios.get('/api/xxx')
        // 注意是以/api开头，即：axios.get('/api/xxx')，不能带接口的域名及端口
        target: 'https://www.baihuzi.com', // 代理目标
        ws: true, // 启用websocket
        changeOrigin: true

        // 匹配到的地址重写， /api/xxx  =>  https://www.baihuzi.com/api/xxx
        // pathRewrite: { '^/api': 'https://www.baihuzi.com/api' }
      }
    }
  },

  chainWebpack (config) {
    config.module.rule('svg')
    // 第一步：让其他svg loader不要对src/assets/imgs/svgs进行操作
      .exclude.add(path.resolve(__dirname, './src/icons/svgs'))
      .end()
    // 第二步：使用svg-sprite-loader 对 src/assets/imgs/svgs下的svg进行操作
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/icons/svgs'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
    // 定义规则 使用时 <svg class="icon"> <use xlink:href="#icon-svg文件名"></use>  </svg>
      .options({ symbolId: 'icon-[name]' })
      .end()
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/styles/global.less')]
    }
  }
}
