define(function(require){
'use strict'
/*
*home 组件的顶级模块
*/

return  {
    template: require('text!components/manager/home/homeTmpl.html'),
    data:function(){
      return {
        msg:'测试一下咯',
        age:20,
      }
    },
    beforeCreate:function(){
      //在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。

    },
    created:function(){

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
