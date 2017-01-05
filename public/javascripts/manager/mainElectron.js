define(function(require){
'use strict'
  if(nodeRequire && typeof nodeRequire ==='function'){
    var electron=nodeRequire('electron');
    var desktopCapturer = electron.desktopCapturer
    var webFrame =electron.webFrame;
    const os = nodeRequire('os');
    console.log('=os net= ',os.networkInterfaces());


  }

return {}

});
