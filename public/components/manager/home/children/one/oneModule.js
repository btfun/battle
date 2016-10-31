define(function(require){
'use strict'

require('text!components/manager/home/children/one/one_style.css')

return  {
    template: require('text!components/manager/home/children/one/oneTmpl.html'),
    data:function(){
      return {
        msg:123,
        age:20,
      }
    },
    watch:{

    },
    methods:{
          goo(){
              this.$router.push({path:'/busi'})
          }
    }
  }


});
