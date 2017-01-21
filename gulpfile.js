var  gulp = require('gulp'),
     babel = require('gulp-babel'),//es6转es5
     uglify = require('gulp-uglify'),//js压缩仅支持es5写法
     minifycss = require('gulp-minify-css'),//css压缩
     less = require('gulp-less'),//编译less
     gulpif = require('gulp-if'),
     minimist = require('minimist'),
     minifyhtml = require('gulp-htmlmin'),//压缩html
     concat = require('gulp-concat'),//合并文件 css使用
     autoprefixer = require('gulp-autoprefixer'),//CSS浏览器前缀补全
     imagemin = require('gulp-imagemin'),//图片压缩
     imageminPngquant = require('imagemin-pngquant'),
     imageminJpegtran = require('imagemin-jpegtran'),
     cache = require('gulp-cache'),
     changed = require('gulp-changed'),//只通过改变的文件
     rename = require('gulp-rename'),//重命名
     watch = require('gulp-watch'),//监听
     rev = require('gulp-rev'),//md5
     merge = require('merge-stream'),
     runSequence= require('run-sequence'),//
     revCollector= require('gulp-rev-collector'),//路径替换
     through2= require('through2'),//路径替换
     del = require('del'),//删除
     clean = require('gulp-clean'),//删除
     reqOptimize = require('gulp-requirejs-optimize'),//- requireJs文件合并所需模块
     notify = require('gulp-notify'),
     debug = require('gulp-debug'),
     plumber = require('gulp-plumber'),
     sourcemaps = require('gulp-sourcemaps'),
     jshint=require('gulp-jshint'),//语法检查
     eslint=require('gulp-eslint');

var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var reload  = browserSync.reload;
var Server  = require('karma').Server;



var paths = {
       path:'public/',
       styles: {
         src:    'public/components/**/*.{css,less}',//组件样式，需合并
         dest:   'build/stylesheets/manager',

         libSrc: 'public/stylesheets/lib/**/*.css',
         libTo:  'build/stylesheets/lib'
       },
       tmpls: {
         src: 'public/components/**/*.html',//模板，无需合并
         dest: 'build/components'
       },
       scripts: {
         //组件
         componentsSrc: 'public/components/**/*.js',
         componentsTo: 'build/components',
         //公用
         golablBaseSrc: 'public/javascripts/base/**/*.js',
         golablBaseTo: 'build/javascripts/base',
         //主入口
         golablSrc: 'public/javascripts/manager/**/*.js',
         golablTo: 'build/javascripts/manager',
         //lib脚本
         libSrc: 'public/javascripts/lib/**/*.js',
         libTo: 'build/javascripts/lib'
       },
       images:{
         src: 'public/components/**/*.{png,jpg,gif,ico}',
         dest: 'build/stylesheets'
       }
     };


 var knownOptions = {
   string: 'env',
   default: { env: process.env.NODE_ENV || 'dev' }
 };

 var options = minimist(process.argv.slice(2), knownOptions);


//css 编译压缩
gulp.task('minifycss', function(){
  //注意 如果发现合并后的css文件大小超过500KB 则需要处理成2个压缩文件

    return gulp.src(paths.styles.src)
    .pipe( changed(paths.styles.dest,{extension: '.min.css'}))//通过改变的文件
    .pipe( debug({title: '编译css:'}))
    .pipe( plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe( less())
    .pipe( sourcemaps.write())
    .pipe( autoprefixer('last 2 versions', '> 1%', 'ie 8', 'Android >=4.0') )  //添加浏览器前缀
    .pipe( gulpif(options.env === 'online',minifycss()) )//发布的时候才压缩
    .pipe( concat('all.css'))
    .pipe( gulpif(options.env === 'online',rename({suffix: '.min'})) )//发布的时候才 rename压缩后的文件名
    .pipe( gulp.dest(paths.styles.dest) ) //输出文件夹
    .pipe(reload({stream: true})); //编译后注入到浏览器里实现更新

});

//lib库复制
gulp.task('copylib',function(){
  var jslib= gulp.src(paths.scripts.libSrc)
        .pipe( gulp.dest(paths.scripts.libTo));

  var csslib= gulp.src(paths.styles.libSrc)
       .pipe( gulp.dest(paths.styles.libTo));

  return merge(jslib, csslib);
});

/***********************js模块编译压缩*******************************/
gulp.task('minifyjs', function(){

  var base= gulp.src(paths.scripts.golablBaseSrc)
      .pipe( plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
      .pipe( changed(paths.scripts.golablBaseTo))//通过改变的文件
      .pipe( babel({presets: ['es2015','stage-3']})) //es6转es5
      .pipe( jshint())//语法检查
      // .pipe( jshint.reporter('default'))//默认错误提示(最严格)
      .pipe( gulpif(options.env === 'online', uglify({
           mangle: {except: ['require' ,'exports' ,'module' ,'$']}
          }).on('error',function(e){
           console.error('【minifyjs】错误信息:',e);
         }) ))//发布的时候才压缩
      .pipe( gulpif(options.env === 'online',rev()) )//发布的时候才MD5
      .pipe( gulp.dest(paths.scripts.golablBaseTo))  //输出
      .pipe(reload({stream: true})) //编译后注入到浏览器里实现更新
      .pipe( gulpif(options.env === 'online',rev.manifest({merge:true})) )//输出描述文件rev-manifest.json
      .pipe( gulpif(options.env === 'online',gulp.dest('')) );


var manager=gulp.src(paths.scripts.golablSrc)
    .pipe( plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe( changed(paths.scripts.golablTo))//通过改变的文件
    .pipe( babel({presets: ['es2015','stage-3']})) //es6转es5
    .pipe( jshint())//语法检查
    .pipe( gulpif(options.env === 'online', uglify({
         mangle: {except: ['require' ,'exports' ,'module' ,'$']}
        }).on('error',function(e){
         console.error('【minifyjs】错误信息:',e);
       }) ))//发布的时候才压缩
    .pipe( gulpif(options.env === 'online',rev()) )//发布的时候才MD5
    .pipe( gulp.dest(paths.scripts.golablTo))  //输出
    .pipe(reload({stream: true})) //编译后注入到浏览器里实现更新
    .pipe( gulpif(options.env === 'online',rev.manifest({merge:true})) )//输出描述文件rev-manifest.json
    .pipe( gulpif(options.env === 'online',gulp.dest('')) );

var components=gulp.src(paths.scripts.componentsSrc)
    .pipe( plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe( changed(paths.scripts.componentsTo))//通过改变的文件
    .pipe( debug({title: '编译js:'}))
    .pipe( babel({presets: ['es2015','stage-3']})) //es6转es5
    .pipe( jshint())//语法检查
    .pipe( gulpif(options.env === 'online', uglify({
         mangle: {except: ['require' ,'exports' ,'module' ,'$']}
        }).on('error',function(e){
         console.error('【minifyjs】错误信息:',e);
       }) ))//发布的时候才压缩
    .pipe( gulpif(options.env === 'online',rev()) ) //发布的时候才MD5
    .pipe( gulp.dest(paths.scripts.componentsTo))  //输出
    .pipe(reload({stream: true})) //编译后注入到浏览器里实现更新
    .pipe( gulpif(options.env === 'online',rev.manifest({merge:true})) )//输出描述文件rev-manifest.json
    .pipe( gulpif(options.env === 'online',gulp.dest('')) );


      return merge(base, manager,components);
});
//html模板压缩
gulp.task('minifyhtml', function(cb) {
   return gulp.src(paths.tmpls.src)
    .pipe( minifyhtml({removeComments: true,collapseWhitespace: true}))
    .pipe( gulpif(options.env === 'online',rev()) ) //发布的时候才MD5
    .pipe(gulp.dest(paths.tmpls.dest))
    .pipe(reload({stream: true})) //编译后注入到浏览器里实现更新
    .pipe( gulpif(options.env === 'online',rev.manifest({merge:true})) )//输出描述文件rev-manifest.json
    .pipe( gulpif(options.env === 'online',gulp.dest('')) );
});

//图片压缩
gulp.task('minifyimages', function() {
  return gulp.src(paths.images.src)
    .pipe(cache(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [imageminPngquant(),imageminJpegtran()] //使用pngquant深度压缩png图片的imagemin插件
        })))
    .pipe(gulp.dest(paths.images.dest));

});


// 静态服务器 + 监听 scss/html 文件

gulp.task('server',function(cb){
    var started = false;
      nodemon({
        ignore:['gulpfile.js','node_modules/', './public/**/*.*'], //忽略不需要监视重启的文件
        script: './bin/www'
    }).on('start',function(){
      if (!started) {
        started = true;
        browserSync.init({
            files: ['./views/**/*.*'], //, './public/**/*.*'（和浏览器注入脚本不能同事使用）
            proxy:'http://localhost:3011', //设置代理运行本地的3000端口
            port:8080, //设置browser-sync的运行端口号
            browser: 'chrome',
            notify: false
        },function(){
            console.log('浏览器已刷新')
        })
      }
    });

      gulp.watch([paths.styles.src],  ['minifycss']);
      gulp.watch([paths.scripts.golablSrc,paths.scripts.golablBaseSrc,paths.scripts.componentsSrc], ['minifyjs']);
      gulp.watch([paths.tmpls.src], ['minifyhtml']);

})

//删除掉上一次构建时创建的资源
gulp.task('clean', function() {
  return del(['build/*','rev-manifest.json']);
});

/////////////////////////////////////开发 =>gulp////////////////////////////////////////////////////
//'server',
gulp.task('default', ['copylib','minifycss','minifyjs','minifyhtml','minifyimages'], function(callback) {

  // 将你的默认的任务代码放在这

});

/////////////////////////////////////生产=> gulp online////////////////////////////////////////////////////

//构建总入口
gulp.task('online', function(callback) {

   runSequence(
       "online_replaceSuffix",               //- 替换.js .html后缀
       "online_replaceRequireConfPath",      //- 路径替换为md5后的路径
       "online_cleanRequireConf",            //删除多余的配置文件
       callback);
});


function modify(modifier) {
    return through2.obj(function(file, encoding, done) {
        var content = modifier(String(file.contents));
        file.contents = new Buffer(content);
        this.push(file);
        done();
    });
}

function replaceSuffix(data) {
    return data.replace(/\.js/gmi, "").replace(/\.html/gmi, "").replace(/\.css/gmi, "");
}

gulp.task("online_replaceSuffix",function (cb) {
    gulp.src(['rev-manifest.json'])
        .pipe(modify(replaceSuffix))            //- 去掉.js后缀
        .pipe(gulp.dest(''))
        .on('end', cb);
});
gulp.task("online_replaceRequireConfPath",function (cb) {
    gulp.src(['rev-manifest.json', './build/javascripts/manager/requireConf-*.js'])
        .pipe(revCollector())   //- 替换为MD5后的文件名
        .pipe(rename('requireConf.js')) //每次发布必更新的文件直接使用系统时间
        .pipe(gulp.dest('./build/javascripts/manager/'))
        .on('end', cb);
});

gulp.task('online_cleanRequireConf', function(cb) {
    gulp.src(['./build/javascripts/manager/requireConf-*.*'])
            .pipe(clean())
            .on('end', cb);
});


////////////////////////////////测试////////////////////////////////////////////////////

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
