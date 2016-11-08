var  gulp = require('gulp'),
     babel = require('gulp-babel'),//es6转es5
     uglify = require('gulp-uglify'),//js压缩仅支持es5写法
     changed = require('gulp-changed'),//只通过改变的文件
     minifycss = require('gulp-minify-css'),//css压缩
    //  sass = require('gulp-sass'),//编译sass
     concat = require('gulp-concat'),//合并文件 css使用
     autoprefixer = require('gulp-autoprefixer'),//CSS浏览器前缀补全
     imagemin = require('gulp-imagemin'),//图片压缩
     rename = require('gulp-rename'),//重命名
     watch = require('gulp-watch'),//重命名
     del = require('del'),//删除
     eslint=require('gulp-eslint');//语法检查
// var $ = require('gulp-load-plugins')();

var paths = {
       styles: {
         src: 'public/components/**/*.scss',
         dest: 'dist/css/'
       },
       scripts: {
         src: 'public/**/*.js',
         dest: 'dist/scripts/'
       },
       images:{
         src: ['public/**/*.png','public/**/*.jpg','public/**/*.svg'],
         dest: 'dist/images/'
       }
     };


//css 编译压缩
gulp.task('sass', function(){
    return gulp.src(paths.styles.src)
    .pipe( watch(paths.styles.src) )   //监听gulp.watch不能监听新增文件
    // .pipe( sass().on('error', function(e){ console.error('【sass】错误信息:',e); }) )  //编译sass
    .pipe( autoprefixer() )  //添加浏览器前缀
    .pipe( gulp.dest(paths.styles.dest) )
    .pipe( minifycss() ) //执行压缩
    .pipe(concat('all.js'))
    .pipe( rename({suffix: '.min'}) )   //rename压缩后的文件名
    .pipe( gulp.dest(paths.styles.dest) ); //输出文件夹
});

//js压缩
gulp.task('minifyjs', function() {
    return gulp.src(paths.scripts.src)
        .pipe( changed(paths.scripts.src))//通过改变的文件
        .pipe( watch(paths.scripts.src) )   //监听gulp.watch不能监听新增文件
        .pipe( eslint().on('error',function(e){ console.error('【eslint】错误信息:',e); })) //语法检查
        .pipe( eslint.format())
        .pipe( eslint.failAfterError())
        .pipe( babel({presets: ['es2015','stage-3']})) //es6转es5
        .pipe( rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe( uglify().on('error',function(e){ console.error('【minifyjs】错误信息:',e); }) )
        .pipe( gulp.dest(paths.scripts.dest));  //输出
});



//图片压缩
gulp.task('images', function() {
  return gulp.src(paths.images.src)
    .pipe(imagemin({optimizationLevel: 2}))
    .pipe(gulp.dest(paths.images.dest));
});



gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('default', ['clean'],function() {
  // 将你的默认的任务代码放在这 'sass','minifyjs',
    gulp.start('images');
    // gulp.watch('public/components/**/*.css', function(){
    //        gulp.run('minifycss');
    //    });
});
