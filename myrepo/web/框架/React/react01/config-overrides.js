const {injectBabelPlugin} = require('react-app-rewired');


module.exports = function override(config, env) {

    // injectBabelPlugin 传入两个参数，第一个参数是数组，写自己的配置，第二个参数是react webpack默认的配置，injectBabelPlugin 会将两者进行整合
    config = injectBabelPlugin([

        // 使用的指令，插件配置，指定库的名字， 指定库所在的目录，同时导出css
        'import', {libraryName: 'antd', libraryDirectory: 'es', style: 'css'}
    ],config);
    return config
};