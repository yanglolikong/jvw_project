<template>
  <div id="app-information1">
    <!-- <div id="bg">
    </div>-->
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">完善资料(1/7)</h1>
    </header>
    <!-- <img src="/img/information.png" alt id="banner"> -->
    <img src="/img/01.png" alt id="bg">
    <div id="p">
      <p>选择你的性别</p>
    </div>
    <div class="mui-btn mui-btn-primary" id="man" @touchstart="start1" @touchend="end1">他</div>
    <div class="mui-btn mui-btn-primary" id="woman" @touchstart="start2" @touchend="end2">她</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  beforeCreate() {
    //进入任何单页面先验证是否登陆 
    //还可以用本地保存的sessionStorage来验证，这里使用发送请求验证的方法
    this.axios.get(`${jvw_url_server}session`).then(result => {
      console.log(result.data.code)
      if (result.data.code == -1) {
        location.href = jvw_url;
      };
    });
  },
  methods: {
    start1(e) {
      e.target.setAttribute("style", "background:rgba(25, 120, 237, 0.9)");
    },
    end1(e) {
      e.target.setAttribute("style", "background:rgba(25, 120, 237, 0.5)");
      //没有判定手指是否移出元素，即使移出元素放开，也会出发
      this.axios.get(`${jvw_url_server}info1?sex=1`).then(result=>{
        location.href=`${jvw_url}information2`
      })
    },
    start2(e) {
      e.target.setAttribute("style", "background:rgba(224, 157, 118, 0.9)");
    },
    end2(e) {
      e.target.setAttribute("style", "background:rgba(224, 157, 118, 0.5)");
      //没有判定手指是否移出元素，即使移出元素放开，也会出发
      this.axios.get(`${jvw_url_server}info1?sex=0`).then(result=>{
        if(result.data.code==1){
          location.href=`${jvw_url}information2`
        }
      })
    }
  }
};
</script>
<style scoped>
p {
  color: #615045;
  font-size: 5vw;
}
#p {
  width: 100vw;
  height: 8vh;
  text-align: center;
  line-height: 8vh;
  position: fixed;
  top: 40px;
  left: 0;
  background: rgba(225, 225, 225, 0.6);
}
#bg {
  width: 100vw;
  position: fixed;
  left: 0;
  top: 40px;
}
a,
.mui-title {
  color: #666;
}
#man.mui-btn-primary {
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
  text-align: center;
  line-height: 16vw;
  font-size: 8vw;
  background: rgba(25, 120, 237, 0.5);
  position: fixed;
  top: 20vh;
  left: 15vw;
}

#woman.mui-btn-primary {
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
  text-align: center;
  line-height: 16vw;
  font-size: 8vw;
  background: rgba(224, 157, 118, 0.5);
  position: fixed;
  top: 20vh;
  left: 65vw;
  border: 1px solid rgb(200, 142, 100);
}
</style>
