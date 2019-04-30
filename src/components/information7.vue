<template>
  <div id="app-information7">
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">完善资料(7/7)</h1>
    </header>
    <input type="text" placeholder="请给自己取一个昵称，8个字以内" id="uname" autofocus="autofocus">
    <div class="mui-input-row" style="margin: 10px 5px;">
      <textarea id="manifesto" rows="5" placeholder="我的爱情宣言，50字以内"></textarea>
    </div>
    <button type="button" class="mui-btn mui-btn-primary" id="confirm" @click="confirm">确认</button>
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
  methods:{
    confirm(){
      var vue=this
      var uname=document.getElementById("uname").value
      var manifesto=document.getElementById("manifesto").value
      if(!uname || !manifesto){
        this.$toast("昵称或宣言不能为空")
      }else{
         this.axios
        .get(`${jvw_url_server}info7?uname=${uname}&manifesto=${manifesto}`)
        .then(result => {
          if (result.data.code == 1) {
            console.log("完成所有步奏")
            location.href = `${jvw_url}user`;
          }else if(result.data.code == 0){
            vue.$toast(`${result.data.msg}`)//改昵称已存在
          };
        });
      }
    }
  }
};
</script>
<style scoped>
#uname {
  width: 90vw;
  position: fixed;
  top: 20vh;
  left: 5vw;
}
#manifesto {
  width: 90vw;
  position: fixed;
  top: 30vh;
  left: 5vw;
}
#confirm {
  width: 50vw;
  height: 10vw;
  position: fixed;
  top: 60vh;
  left: 25vw;
  line-height: 5vw;
}

a,
.mui-title {
  color: #666;
}
</style>


