var  gulp = require('gulp'),
     babel = require('gulp-babel'),//es6转es5
     uglify = require('gulp-uglify'),//js压缩仅支持es5写法
     minifycss = require('gulp-minify-css'),//css压缩
     less = require('gulp-less'),//编译less
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
         src: 'public/components/**/*.js',
         dest: 'build/components',
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
         dest: 'build/stylesheets/manager'
       },
       production:{

       }
     };


//css 编译压缩
gulp.task('minifycss', function(){
    return gulp.src(paths.styles.src)
    .pipe( changed(paths.styles.dest,{extension: '.min.css'}))//通过改变的文件
    .pipe( debug({title: '编译css:'}))
    .pipe( plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe( less())
    .pipe( sourcemaps.write())
    .pipe( autoprefixer('last 2 versions', '> 1%', 'ie 8', 'Android >=4.0') )  //添加浏览器前缀
    .pipe( minifycss() ) //执行压缩
    .pipe( concat('all.css'))
    .pipe( rename({suffix: '.min'}) )   //rename压缩后的文件名
    .pipe( gulp.dest(paths.styles.dest) ) //输出文件夹
    .pipe(reload({stream: true})); //编译后注入到浏览器里实现更新
});

//lib库复制
gulp.task('copyjslib',function(){
  return gulp.src(paths.scripts.libSrc)
        .pipe( gulp.dest(paths.scripts.libTo));
});
gulp.task('copycsslib',function(){
  return gulp.src(paths.styles.libSrc)
        .pipe( gulp.dest(paths.styles.libTo));
});

//base压缩
gulp.task('minifygolbalbasejs', function(){
  return gulp.src(paths.scripts.golablBaseSrc)
      .pipe( plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
      .pipe( changed(paths.scripts.golablBaseTo))//通过改变的文件
      .pipe( babel({presets: ['es2015','stage-3']})) //es6转es5
      .pipe( jshint())//语法检查
      .pipe( jshint.reporter('default'))//默认错误提示
      // .pipe( eslint())
      // .pipe( eslint.format())
      // .pipe( eslint.failAfterError())
      .pipe( uglify( {mangle: {except: ['require' ,'exports' ,'module' ,'$']} } ).on('error',function(e){ console.error('【minifyjs】错误信息:',e); }) )
      .pipe( gulp.dest(paths.scripts.golablBaseTo))  //输出
      .pipe(reload({stream: true})); //编译后注入到浏览器里实现更新
});

//manager压缩
gulp.task('minifygolbaljs', function(){
  return gulp.src(paths.scripts.golablSrc)
      .pipe( plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
      .pipe( changed(paths.scripts.golablTo))//通过改变的文件
      .pipe( babel({presets: ['es2015','stage-3']})) //es6转es5
      .pipe( jshint())//语法检查
      .pipe( jshint.reporter('default'))//默认错误提示
      // .pipe( eslint())
      // .pipe( eslint.format())
      // .pipe( eslint.failAfterError())
      .pipe( uglify( {mangle: {except: ['require' ,'exports' ,'module' ,'$']} } ).on('error',function(e){ console.error('【minifyjs】错误信息:',e); }) )
      .pipe( gulp.dest(paths.scripts.golablTo))  //输出
      .pipe(reload({stream: true})); //编译后注入到浏览器里实现更新
});
//js压缩
gulp.task('minifyjs', function() {
    return gulp.src(paths.scripts.src)
        .pipe( plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe( changed(paths.scripts.dest))//通过改变的文件
        .pipe( debug({title: '编译js:'}))
        .pipe( babel({presets: ['es2015','stage-3']})) //es6转es5
        .pipe( jshint())//语法检查
        .pipe(jshint.reporter('default'))//默认错误提示
        // .pipe( eslint()) //格式检查
        // .pipe( eslint.format())
        // .pipe( eslint.failAfterError())
        .pipe( uglify( {mangle: {except: ['require' ,'exports' ,'module' ,'$']}} ).on('error',function(e){ console.error('【minifyjs】错误信息:',e); }) )
        .pipe( gulp.dest(paths.scripts.dest))  //输出
        .pipe(reload({stream: true})); //编译后注入到浏览器里实现更新
});

gulp.task('minifyhtml', function() {
  return gulp.src(paths.tmpls.src)
    .pipe(minifyhtml({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.tmpls.dest))
    .pipe(reload({stream: true})); //编译后注入到浏览器里实现更新
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

// 静态服务器 + 监听 文件 , './build/**/*.*'
gulp.task('server',['nodemon'], function() {
//,'./public/javascripts/manager/*.js'
  browserSync.init({
    proxy: 'http://localhost:3000',
    files: ['./views/**/*.*'],
    browser: 'chrome',
    notify: false,
    port: 8888
  });

});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
      script: './bin/www'
    }).on('start', function () {
      if (!called) {cb();  called = true; }
    });
});

//删除掉上一次构建时创建的资源
gulp.task('clean', function() {
  return del(['build/components/*',
              'build/javascripts/base/*',
              'build/javascripts/manager/*',
              'build/stylesheets/manager/*']);
});
//'clean', ,'minifyimages'
/////////////////////////////////////开发////////////////////////////////////////////////////
gulp.task('default', ['clean','copycsslib','copyjslib','server'], function() {
  // 将你的默认的任务代码放在这 'sass','minifyjs',
    gulp.run('minifygolbaljs','minifygolbalbasejs','minifycss','minifyjs','minifyhtml');

    gulp.watch([paths.styles.src],  ['minifycss']);
    gulp.watch([paths.scripts.src], ['minifyjs']);
    gulp.watch([paths.scripts.golablSrc], ['minifygolbaljs']);
    gulp.watch([paths.scripts.golablBaseSrc], ['minifygolbalbasejs']);
    gulp.watch([paths.tmpls.src], ['minifyhtml']);

});

/////////////////////////////////////生产////////////////////////////////////////////////////
//构建总入口
gulp.task('online',['clean','copycsslib','copyjslib','minifygolbaljs','minifygolbalbasejs','minifycss','minifyjs','minifyhtml'], function(callback) {

   runSequence(
       "online_clean",       //- 上一次构建的结果清空
       "online_md5",                  //- 文件合并与md5
       "online_replaceSuffix",        //- 替换.js后缀
       "online_replaceRequireConfPath",      //- 路径替换为md5后的路径
       callback);
});


gulp.task('online_clean', function() {
  return del(['rev-manifest.json']);
});

gulp.task('online_md5',function(){
  return gulp.src(['build/**/*.js',
                   '!build/javascripts/lib/**/*.js'])
        .pipe( rev())    //- 文件名加MD5后缀
        .pipe( rev.manifest({merge:true}))
        .pipe( gulp.dest(''));          //- 映射文件输出目录
        // .pipe( gulp.dest('build/**/*.js'));
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
    return data.replace(/\.js/gmi, "");
}

gulp.task("online_replaceSuffix",function (cb) {
    gulp.src(['rev-manifest.json'])
        .pipe(modify(replaceSuffix))            //- 去掉.js后缀
        .pipe(gulp.dest(''))
        .on('end', cb);
});
gulp.task("online_replaceRequireConfPath",function (cb) {
    gulp.src(['rev-manifest.json', './build/javascripts/manager/requireConf.js'])
        .pipe(revCollector())   //- 替换为MD5后的文件名
        .pipe(rename("requireConf.md5.js"))
        .pipe(gulp.dest('./build/javascripts/manager/'))
        .on('end', cb);
});


////////////////////////////////测试////////////////////////////////////////////////////

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
