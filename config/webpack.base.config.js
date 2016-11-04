var webpack = require("webpack");
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].[hash].js',
  },
  module: {
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
        test: /\.vue/,
        loader: 'vue',
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
  resolve: {
    extensions: ['.vue','.js', 'json', ' '],
    alias: {
      'components': './src/',
    }
  },
}
