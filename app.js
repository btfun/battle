var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var template = require('art-template');
var os = require('os');
var app = express();

var logger=require('./routes/util/logUtil').logger;
var emailUtil = require('./routes/util/emailUtil');

// 视图引擎设置
template.config('base', '');
template.config('extname', '.html');
template.config('encoding', 'utf-8');
template.config('cache', false);
template.config('openTag', '{{{');
template.config('closeTag', '}}}');

app.engine('.html', template.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

//路由配置


var routes = require('./routes/index');
var users = require('./routes/users');


app.use('/', routes);
app.use('/users', users);


if (process.env.NODE_USER) {
  logger.info("run as "+process.env.NODE_USER);
  process.setuid(process.env.NODE_USER);
}

var network = os.networkInterfaces();
var netInfo=network['本地连接']||network['eth0']||[];

process.on("uncaughtException", function (err) {

  var info=netInfo.filter(function(item){
    return item.family=='IPv4';
  }),serverIp=(info.length>0 ? info[0].address : ' 空 ');

  //系统级异常监控
  logger.info('进程异常:',err.message + "\n\n" + err.stack + "\n\n" + err.toString());

  emailUtil.sendMail({
    subject : "saas.web http://"+serverIp+" 发生严重错误，导致用户不能正常使用系统，请火速救援 [Web Server Error]",
    text    : err.message + "\n\n" + err.stack + "\n\n" + err.toString()
  });

  setTimeout(function () {
    process.exit(1);
  }, 5000);

});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
