const path = require('path');

module.exports = {
    // 模式 'none'  'production'  'development'
    mode: 'development',
    // 单入口文件配置
    entry: './src/js/main.js',
    // 出口文件
    output: {
        filename: 'bundle.js',
        // 设置全路径
        path: path.resolve(__dirname, 'dist')
    },

    /*
    多入口文件配置
    entry: {
        index_a: './src/js/1.js',
        index_b: './src/js/2.js'
    }
    output: {
        path: path.resolve(__dirname, 'dist'),

        // 这里[name]会替换成入口里面的键的值index_a index_b
        filename: '[name].min.js'
    }
    */
    module: {
        // 规则数组，里面的每一个对象都是描述一个loader
        rules: [
            {
                test: /\.css$/,
                // use里面调用顺序是从后往前开始调用的
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            outputPath: './image',
                            // 32k以下，以base64存，否则用文件存
                            limit: 500 * 1024
                        }
                        // query: {
                        //     name: 'img/[name]-[hash:5].[ext]'
                        // }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.jsx?/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devtool: 'source-map'
};