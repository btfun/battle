define(function(require){
'use strict'

// require('text!components/manager/home/children/two/two_style.css')

return  {
    template: require('text!components/manager/home/children/two/twoTmpl.html'),
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
