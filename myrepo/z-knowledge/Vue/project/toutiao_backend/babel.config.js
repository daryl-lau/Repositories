let productPlugs = []

if (process.env.VUE_APP_FLAG === 'production') {
  productPlugs.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    ...productPlugs,
    "@babel/plugin-syntax-dynamic-import"
  ]
}
