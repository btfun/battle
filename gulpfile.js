var  gulp = require('gulp'),
     uglify = require('gulp-uglify'),
     minifycss = require('gulp-minify-css'),
     imagemin = require('gulp-imagemin'),
     rename = require('gulp-rename'),
     del = require('del'),
     jshint=require('gulp-jshint');

// var paths = {
//       scripts: 'public/',
//       images: 'client/img/**/*'
//     };

//语法检查
gulp.task('jshint', function () {
   return gulp.src('public/*.js')
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});

gulp.task('minifycss', function() {
    return gulp.src('public/components/**/*.css')      //压缩的文件
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('build/css'));   //输出文件夹
});
// gulp.task('images', ['clean'], function() {
//   return gulp.src('public/**/*.png')
//     .pipe(imagemin({optimizationLevel: 5}))
//     .pipe(gulp.dest('build/img'));
// });
gulp.task('minifyjs', function() {
    return gulp.src('public/javascripts/manager/**/*.js')
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify().on('error',function(e){
           console.log('err===',e);
        }))    //压缩
        .pipe(gulp.dest('build/js'));  //输出
});

gulp.task('clean', function() {
  return del(['build']);
});

// gulp.task('watch', function() {
//   gulp.watch(paths.scripts, ['scripts']);
//   gulp.watch(paths.images, ['images']);
// });

gulp.task('default', ['clean'],function() {
  // 将你的默认的任务代码放在这
    gulp.start('minifycss','jshint','minifyjs');
    // gulp.watch('public/components/**/*.css', function(){
    //        gulp.run('minifycss');
    //    });
});
