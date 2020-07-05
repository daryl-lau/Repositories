# 如何在vue中替换使用默认的svg loader

### 1、要知道如何修改，首先要知道如何查看
`vue-cli3` 默认是不暴露webpack的配置在项目目录中的，在项目根目录使用`vue inspect`可以查看所有的webpack配置（如果实在是想看，可以使用`vue eject` 把所以配置暴露出来，但是该操作不可逆，拿出来了就藏不回去了，慎重使用）

由于`vue inspect`命令的输出太太太长了，这里就不贴出来了，但是vue想到了这一点，我们可以指定命令选项来查看我们需要的信息

`vue inspect --rule svg `
```js
/* config.module.rule('svg') */
{
  test: /\.(svg)(\?.*)?$/,
  use: [
    /* config.module.rule('svg').use('file-loader') */
    {
      loader: 'D:\\Microsoft VS Code\\Repositories\\myrepo\\z-knowledge\\Vue\\project\\study\\node_modules\\file-loader\\dist\\cjs.js',
      options: {
        name: 'img/[name].[hash:8].[ext]'
      }
    }
  ]
}
```
我们想要把默认的处理svg的file-loader修改成为`svg-sprite-loader`

### 2、安装 svg-sprite-loader
```js
npm i svg-sprite-loader -D 
```

### 3、修改vue.config.js
```js
const path = require('path') // 下面的处理目录只能使用绝对路径，因此使用nodejs的path方法

module.exports = {
    chainWebpack: config => {
        config.module.rule('svg')
            .exclude.add(path.resolve(__dirname, './src/icons/svgs')); // svg规则不再处理'./src/icons/svgs'目录下的文件

        config.module.rule('icons') // 新增一个icons规则，处理.svg后缀的文件
            .test(/\.svg$/)
            .include.add(path.resolve(__dirname, './src/icons/svgs'))
                .end()
            .use('svg-sprite-loader')
                .loader('svg-sprite-loader')
                .options({ symbolId: 'icon-[name]' }) // 定义使用svg的方式
                .end()
    }
}
```
修改后会新增一个规则`icons`,该配置如下

`vue inspect --rule icons`
```js
/* config.module.rule('icons') */
{
  test: /\.svg$/,
  include: [
    './src/icons/svgs'
  ],
  use: [
    /* config.module.rule('icons').use('svg-sprite-loader') */
    {
      loader: 'svg-sprite-loader',
      options: {
        symbolId: 'icon-[name]'
      }
    }
  ]
}
```

### 4、使用svg图标
##### 4.1 在阿里图标库下载svg格式的图标，保存在`src/icons`目录下
```bash
|--icons
   |--svgs
      wx.svg
      qq.xvg
```
##### 4.2 然后在组件/页面中进行导入
```js
import '@/icons/svgs/wx.svg'
import '@/icons/svgs/qq.svg'
```
##### 4.3 在标签中进行使用
```html
<svg>
  <use xlink:href="#icon-wx"></use>
</svg>
<svg>
  <use xlink:href="#icon-qq"></use>
</svg>
```

### 5、每次都按需导入十分麻烦，可以一次性导入所有svg图标
新建文件`src/icons/index.js`，添加以下代码
```js
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context("./svgs", false, /.svg$/);
requireAll(req);
```

在`main.js`中引入该`index.js`文件
```js
import '@/icons/index'
```
此时就不用了每次使用都单独导入了，因此上面4.2步骤中的导入可以不写了

### 6、封装svg组件
>`'@/components/icons/SvgIcon'`
```js
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
    name: 'svg-icon',
    props: {
        iconClass: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: ''
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`
        },
        svgClass() {
            if (this.className) {
                return 'svg-icon' + this.className
            } else {
                return 'svg-icon'
            }
        }
    }
}
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
```
使用
```html
<SvgIcon icon-class="wx"></SvgIcon>
```
