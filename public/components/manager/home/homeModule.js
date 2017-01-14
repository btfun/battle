define(function(require){
'use strict'
/*
*home 组件的顶级模块
*/


return  {
    // template: require('text!components/manager/home/homeTmpl.html'),
    template: require('home.homeTmpl'),
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
          },
          note(){
            this.$notify({
                 title: '标题名称',
                 message: '阿里里阿里里阿里里阿里里'
               });
          }
    }
  }


});
