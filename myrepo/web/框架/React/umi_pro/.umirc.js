// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'umi_pro',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  routes: [
    {
      path: '/', component: './_layout',
      routes: [
        {path: '/', component: './index'},
        {path: '/about', component: './about'},
        {path: '/goods', component: './goods/index'},
        {path: '/gooods', component: './gooods/index'}
      ]
    },
  ]
}
