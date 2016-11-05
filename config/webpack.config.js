let webpack = require("webpack");
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let devMiddleWare = require('webpack-dev-middleware');
let hotMiddleWare = require('webpack-hot-middleware');


// let baseConfig = require('./webpack.base.config');
let devOption = {
  context: __dirname,
  entry: {
    app:[
    // 'webpack-hot-middleware/client',
    './public/javascripts/manager/mainIndex.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: '[name].[hash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  plugins: [
    new webpack.BannerPlugin('This is battle done'),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './views/index.html',
      inject: true  //是否注入
    }),
  ],
  module: {
    //加载器配置
    loaders:[
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules|vendor|bootstrap/,
        options: {
          presets: 'es2015',
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules|vendor|bootstrap/,
        loader: 'style!css!autoprefixer?{browsers:["last 2 version", "> 1%"]}'
      }

    ]
  },
  //其它解决方案配置
  // resolve: {
  //   fallback: path.join(__dirname, "node_modules"),
  //   extensions: ['.vue','.js', 'json', ' ']
  // },
  resolveLoader: { fallback: path.join(__dirname, "node_modules") }
}

module.exports=devOption
