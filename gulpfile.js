var  gulp = require('gulp'),
     babel = require('gulp-babel'),//es6转es5
     uglify = require('gulp-uglify'),//js压缩仅支持es5写法
     minifycss = require('gulp-minify-css'),//css压缩
     minifyhtml = require('gulp-htmlmin'),//压缩html
     concat = require('gulp-concat'),//合并文件 css使用
     autoprefixer = require('gulp-autoprefixer'),//CSS浏览器前缀补全
     imagemin = require('gulp-imagemin'),//图片压缩
     imageminPngquant = require('imagemin-pngquant'),
     imageminJpegtran = require('imagemin-jpegtran'),
     cache = require('gulp-cache'),
     changed = require('gulp-changed'),//只通过改变的文件
     rename = require('gulp-rename'),//重命名
     watch = require('gulp-watch'),//重命名
     del = require('del'),//删除
     eslint=require('gulp-eslint');//语法检查

var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var reload      = browserSync.reload;


var paths = {
       path:'public/',
       styles: {
         src:    'public/components/**/*.css',//组件样式，需合并
         dest:   'build/stylesheets/manager',
         libSrc: 'public/stylesheets/lib/**/*.css',
         libTo:  'build/stylesheets/lib'
       },
       tmpls: {
         src: 'public/components/**/*.html',//模板，无需合并
         dest: 'build/components'
       },
       scripts: {
         src: 'public/components/**/*.js',
         dest: 'build/components',

         golablSrc:'public/javascripts/manager/**/*.js',
         golablTo:'build/javascripts/manager',

         libSrc: 'public/javascripts/lib/**/*.js',
         libTo: 'build/javascripts/lib'
       },
       images:{
         src: 'public/components/**/*.{png,jpg,gif,ico}',
         dest: 'build/stylesheets/images'
       }
     };


//css 编译压缩
gulp.task('minifycss', function(){
    return gulp.src(paths.styles.src)
    .pipe( autoprefixer('last 2 versions', '> 1%', 'ie 8', 'Android 2') )  //添加浏览器前缀
    .pipe( minifycss() ) //执行压缩
    .pipe(concat('all.css'))
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
})
gulp.task('minifygolbaljs', function(){
  return gulp.src(paths.scripts.golablSrc)
      .pipe( changed(paths.scripts.golablSrc))//通过改变的文件
      .pipe( babel({presets: ['es2015','stage-3']})) //es6转es5
      .pipe( eslint({
        rules: {
          'strict': 0
        },
        globals: [
            'jQuery',
            '$',
            'Vue'
        ],
        envs: [
            'browser'
        ]
      })) //语法检查
      .pipe( eslint.format())
      .pipe( eslint.failAfterError())
      .pipe( uglify().on('error',function(e){ console.error('【minifyjs】错误信息:',e); }) )
      .pipe( gulp.dest(paths.scripts.golablTo))  //输出
      .pipe(reload({stream: true})); //编译后注入到浏览器里实现更新
});
//js压缩
gulp.task('minifyjs', function() {
    return gulp.src(paths.scripts.src)
        .pipe( changed(paths.scripts.src))//通过改变的文件
        .pipe( watch(paths.scripts.src) )   //监听gulp.watch不能监听新增文件
        .pipe( babel({presets: ['es2015','stage-3']})) //es6转es5
        .pipe( eslint({
          rules: {
            'strict': 1
          },
          globals: [
              'jQuery',
              '$'
          ],
          envs: [
              'browser'
          ]
        })) //语法检查
        .pipe( eslint.format())
        .pipe( eslint.failAfterError())
        .pipe( uglify().on('error',function(e){ console.error('【minifyjs】错误信息:',e); }) )
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
gulp.task('images', function() {

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
gulp.task('server', ['nodemon'], function() {

  browserSync.init({
    proxy: 'http://localhost:3000',
    files: ['./views/**/*.*', './build/**/*.*'],
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


gulp.task('clean', function() {
  return del(['build/components/*','build/javascripts/manager/*','build/stylesheets/manager/*']);
});

gulp.task('default', ['clean','copycsslib','copyjslib','server'], function() {
  // 将你的默认的任务代码放在这 'sass','minifyjs',
    gulp.start('minifygolbaljs','minifycss','minifyjs','minifyhtml');

    // gulp.watch([paths.styles.src],  ['minifycss']);
    // gulp.watch([paths.scripts.src], ['minifyjs']);
    // gulp.watch([paths.tmpls.src], ['minifyhtml']);

});
