define(function(require){



  return  {
    template: require('text!busi.busiTmpl.html'),
    data:function(){
      return {
        msg:123,
        age:20
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

    }
  }


});
