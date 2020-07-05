module.exports = {
  lintOnSave: false,
  publicPath: './',
  chainWebpack: config => {
    config.set('externals', {
      vue: 'Vue',
      echarts: 'echarts',
      'vue-quill-editor': 'VueQuillEditor',
      lodash: '_',
      'vue-router': 'VueRouter',
    })
  }
}
