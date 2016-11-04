let webpack = require("webpack");
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let devMiddleWare = require('webpack-dev-middleware');
let hotMiddleWare = require('webpack-hot-middleware');


let baseConfig = require('./webpack.base.config');
let devOption = {
  entry: {
    app:[
    'webpack-hot-middleware/client',
    './src/main.js'
    ]
  },
  output: {
    path: '/',
  // publicPath: '/'
  },
  plugins: [

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './views/index.html'
    }),
  ]
}


module.exports = function(app){
let webpackconfig = Object.assign({}, baseConfig, devOption);// console.log(webpackconfig);

var compiler = webpack(webpackconfig);// console.log(compiler);
app.use(devMiddleWare(compiler,{
  publicPath: webpackconfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}));
app.use(hotMiddleWare(compiler));
  return app;
}
