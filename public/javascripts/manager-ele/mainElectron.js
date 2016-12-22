define(function(require){

  if(nodeRequire && typeof nodeRequire ==='function'){

    var desktopCapturer = nodeRequire('electron').desktopCapturer
    desktopCapturer.getSources({types: ['window', 'screen']}, function (error, sources) {
      if (error) throw error
      console.log('electron')
      for (var i = 0; i < sources.length; ++i) {
        if (sources[i].name === 'Electron') {
          navigator.webkitGetUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: sources[i].id,
                minWidth: 1280,
                maxWidth: 1280,
                minHeight: 720,
                maxHeight: 720
              }
            }
          }, gotStream, getUserMediaError)
          return
        }
      }
    });



  }

return {}

});
