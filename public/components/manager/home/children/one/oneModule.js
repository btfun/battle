define(function(require){
'use strict'

// require('text!components/manager/home/children/one/one_style.css')

return  {
    template: require('text!components/manager/home/children/one/oneTmpl.html'),
    data:function(){
      return {
        msg:123,
        age:20,
      }
    },
    beforeCreate:function(){
      //在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。

    },
    created:function(){

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
