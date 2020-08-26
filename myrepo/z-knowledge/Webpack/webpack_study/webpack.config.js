const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ManifestPlugin = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
  },
  entry: {
    index: './src/js/index.js',
    home: './src/js/home.js',
  },
  output: {
    filename: '[name].[contenthash:8].bundle.min.js',

    // chunk中输出的文件名称，只有动态导入的模块才会用这个名字，一般正常的导入是输出到bundle中
    chunkFilename: '[id]-[contenthash:8].chunk.js',

    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.html$/, use: {
          loader: 'html-withimg-loader',
          // options: { attrs: ['img:src'] }
        }
      },
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      // { test: /\.jpg$/, use: ['file-loader'] },
      {
        test: /\.(png|jpg)$/, use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            outputPath: 'images',
            name: '[name].[hash:8].[ext]',

            // 当使用html-withimg-loader之后，需要指定这个，否则打包出来的文件有问题
            esModule: false
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          comments: false,
        },
      },
      extractComments: false,
    })],
    splitChunks: {
      chunks: "initial",
      minSize: 30000, // 模块的最小体积
      minChunks: 1, // 模块的最小被引用次数
      maxAsyncRequests: 5, // 按需加载的最大并行请求数
      maxInitialRequests: 3, // 一个入口最大并行请求数
      automaticNameDelimiter: '~', // 文件名的连接符
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,  // 判断引入库是否是node_modules里的
          priority: -10,   // 数字越大优先级越高 （-10大于-20）
          // filename: 'vendor.min.js'  // 设置代码分割后的文件名，仅在chunks为initial时能用，否则报错
        },
        default: {
          filename: 'common.bundle.js',
          priority: -20,
          minChunks: 2,    // 在拆分之前共享模块的最小块数, 默认为1，表示只要有一个地方引入，就抽离到公共模块，设置为2表示 有两个chunk 引入同一个人文件才进行抽离，设置2更为合理一点
          reuseExistingChunk: true   // 允许在模块完全匹配时重用现有的块，而不是创建新的块
        }
      }
    }
  },
  plugins: [
    new ManifestPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: '[name]-[contenthash].css',
      chunkFilename: '[id]-[contenthash].chunk.css',
    }),
    // new BundleAnalyzerPlugin(),
  ]
};