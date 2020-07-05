# style-resources-loader
在引入less的变量或函数时，需要手动@import 才能使用，如果多个地方使用到，就需要引入多次，很不方便，使用style-resources-loader可以使我们配置一次，在全局范围内都可以使用

#### 1、安装
```bash 
vue add style-resources-loader 
```
> vue-cli 3+ 才支持该方式安装，如果不是使用npm安装即可

安装过程中会让我们选择使用的css编译器，我选择less，其实选择什么都是一样的配置方式

#### 2、配置
在`vue.config.js`中添加以下配置
```js
module.exports = {
   pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/styles/global.less')]
    }
  }
}
```
注意paterns就是需要多次引入的less文件绝对路径，可以添加多个，配置好了之后重启以下，就可以在全局使用该文件中定义的变量或函数了

