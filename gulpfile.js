var  gulp = require('gulp'),
     babel = require('gulp-babel'),
     uglify = require('gulp-uglify'),
     minifycss = require('gulp-minify-css'),
     autoprefixer = require('gulp-autoprefixer'),
     imagemin = require('gulp-imagemin'),
     rename = require('gulp-rename'),
     del = require('del'),
     jshint=require('gulp-jshint');
// var $ = require('gulp-load-plugins')();

    //  var paths = {
    //    styles: {
    //      src: 'src/styles/**/*.less',
    //      dest: 'assets/styles/'
    //    },
    //    scripts: {
    //      src: 'src/scripts/**/*.js',
    //      dest: 'assets/scripts/'
    //    }
    //  };


//es6转换
gulp.task('es6', function() {
   return gulp.src('public/javascripts/manager/**/*.js')
    //  .pipe($.plumber())
     .pipe(babel())
     .pipe(gulp.dest('dist'));
 });
//语法检查
gulp.task('jshint', function () {
   return gulp.src('public/*.js')
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});
//css压缩
gulp.task('minifycss', function() {
    return gulp.src('public/components/**/*.css')      //压缩的文件
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名

        .pipe(autoprefixer())
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('build/css'));   //输出文件夹
});
//图片压缩
gulp.task('images', ['clean'], function() {
  return gulp.src('public/**/*.png')
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});
//js压缩
gulp.task('minifyjs', function() {
    return gulp.src('public/javascripts/manager/**/*.js')
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify().on('error',function(e){
           console.log('错误信息:',e);
        }))
        .pipe(gulp.dest('build/js'));  //输出
});

gulp.task('clean', function() {
  return del(['build']);
});

// gulp.task('watch', function() {
//   gulp.watch(paths.scripts, ['scripts']);
//   gulp.watch(paths.images, ['images']);
// });

gulp.task('default', ['clean','es6','jshint'],function() {
  // 将你的默认的任务代码放在这
    gulp.start('minifycss','minifyjs');
    // gulp.watch('public/components/**/*.css', function(){
    //        gulp.run('minifycss');
    //    });
});
