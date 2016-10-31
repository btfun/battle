define(function(require){
'use strict'

require('text!components/manager/home/children/two/two_style.css')

return  {
    template: require('text!components/manager/home/children/two/twoTmpl.html'),
    data:function(){
      return {
        msg:123,
        age:20,
      }
    },
    watch:{
      msg:function(ms){
        console.log(ms)
      }
    },
    methods:{
          goo: function(){
              this.$router.push({path:'/busi'})
          }
    }
  }


});
