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
    './public/javascripts/manager/requireConf.js'
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
    rules:[
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
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
    extensions: ['.vue','.js', 'json', ' ']
  },
  resolveLoader: { fallback: path.join(__dirname, "node_modules") }
}


module.exports = function(app){
// let webpackconfig = Object.assign({}, baseConfig, devOption);// console.log(webpackconfig);
let webpackconfig = Object.assign({},  devOption);// console.log(webpackconfig);

var compiler = webpack(webpackconfig);
//console.log(compiler);

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
