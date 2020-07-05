## 1、安装`babel-plugin-import`、`react-app-rewired`、`customize-cra`
```
npm i babel-plugin-import react-app-rewired customize-cra --save-dev
```

## 2、修改`package.json`
```json
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```
## 3、创建`config-overrides.js`，并添加以下内容
```js
const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
);
```

## 4、使用按需导入，无需手动引入css文件
```js
import { Button } from 'antd-mobile'
```
