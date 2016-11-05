var webpack = require("webpack");
var path = require('path');

module.exports = {
  context: __dirname,
  //页面入口文件配置
  // entry: ['./public/javascripts/manager/requireConf.js'],
  //入口文件输出配置
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].[hash].js',
  },
  module: {
    //加载器配置
    rules:[
      {
        test: /\.js/,
        include:[path.resolve(__dirname,'src')],
        loader: 'babel',
        options: {
          presets: 'es2015',
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css!autoprefixer?{browsers:["last 2 version", "> 1%"]}'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  //其它解决方案配置
  resolve: {
    fallback: path.join(__dirname, "node_modules"),
    extensions: ['.vue','.js', 'json', ' '],
    alias: {
      'components': './src/',
    }
  },
  resolveLoader: { fallback: path.join(__dirname, "node_modules") }
}
