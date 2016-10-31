define(function(require){
'use strict'


  return  {
    template: require('text!components/manager/custom/customTmpl.html'),
    data:function(){
      return {
        msg:123,
        age:20,
      }
    }
  }


});
