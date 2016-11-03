define(function(require){
'use strict'
/*
home 组件的顶级模块
*/

return  {
    template: require('text!components/manager/home/homeTmpl.html'),
    data:function(){
      return {
        msg:1230000000,
        age:20,
      }
    },
    computed:{
      count () {
        return this.$store.state.count
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
