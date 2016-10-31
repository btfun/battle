define(function(require){
'use strict'


return  {
    template: require('text!components/manager/home/homeTmpl.html'),
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
