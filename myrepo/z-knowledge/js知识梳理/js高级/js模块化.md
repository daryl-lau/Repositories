## JS模块化分为CommonJS、AMD、CMD

# CommonJS
NodeJS遵循CommonJS规范
CmmonJS规定了一个文件就是一个模块，文件中维护一个module全局变量，exports属性是对外的接口
加载一个模块即加载module.exports属性，使用require方法加载模块
模块中有自己独立的作用域，变量，方法等，对其他模块都不可见，因此两个模块间可以使用相同的变量名或方法名
模块可以被多次加载，但只在第一次加载的时候运行一次，然后就被缓存起来，运行过程中对模块的修改不会影响已在运行的模块
CommonJS加载模块是同步的，对于像nodejs这种后端环境，模块都是保存在磁盘上的，同步指定也不会造成什么问题

nodejs会根据require的是相对路径还是非相对路径做出不同的行为：
> 相对路径

例如，假设有一个文件路径为 `/root/src/moduleA.js`，包含了一个导入`var x = require("./moduleB");` Node.js以下面的顺序解析这个导入：

1. 检查`/root/src/moduleB.js`文件是否存在。
2. 检查`/root/src/moduleB`目录是否包含一个`package.json`文件，且`package.json`文件指定了一个`"main"`模块。 在我们的例子里，如果Node.js发现文件 `/root/src/moduleB/package.json`包含了`{ "main": "lib/mainModule.js" }`，那么Node.js会引用`/root/src/moduleB/lib/mainModule.js`。
3. 检查`/root/src/moduleB`目录是否包含一个`index.js`文件。 这个文件会被隐式地当作那个文件夹下的`"main"`模块。

>非相对模块名的解析是个完全不同的过程。

 Node会在一个特殊的文件夹 `node_modules`里查找你的模块。 `node_modules`可能与当前文件在同一级目录下，或者在上层目录里。 Node会向上级目录遍历，查找每个 `node_modules`直到它找到要加载的模块。

还是用上面例子，但假设`/root/src/moduleA.js`里使用的是非相对路径导入`var x = require("moduleB");`。 Node则会以下面的顺序去解析 `moduleB`，直到有一个匹配上。

1. `/root/src/node_modules/moduleB.js`
2. `/root/src/node_modules/moduleB/package.json` (如果指定了`"main"`属性)
3. `/root/src/node_modules/moduleB/index.js`
4. `/root/node_modules/moduleB.js`
5. `/root/node_modules/moduleB/package.json` (如果指定了`"main"`属性)
6. `/root/node_modules/moduleB/index.js`
7. `/node_modules/moduleB.js`
8. `/node_modules/moduleB/package.json` (如果指定了`"main"`属性)
9. `/node_modules/moduleB/index.js`

注意Node.js在步骤（4）和（7）会向上跳一级目录。

# AMD
AMD是Asynchronous Module Definition的简写，即异步模块定义，`requir.js`遵循AMD规范

require.js应用在前端，组织模块，但是模块的加载需要网络请求，如果使用同步的方式，如果网络阻塞，前端页面就会挂起

AMD也采用`require()`语句加载模块，但是不同于CommonJS，它要求两个参数：
```js
require(['math'], function (math) {
  math.add(2, 3);
});
```
第一个参数`[module]`，是一个数组，里面的成员就是要加载的模块；第二个参数`callback`，则是加载成功之后的回调函数

### CMD
`SeaJS`对模块的态度是懒执行, 而RequireJS对模块的态度是预执行




