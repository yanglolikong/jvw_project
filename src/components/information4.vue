<template>
  <div id="app-information4">
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">完善资料(4/7)</h1>
    </header>
    <div id="bg"></div>
    <img src="/img/cat.png" alt>
    <button
      type="button"
      class="mui-btn mui-btn-block mui-btn-outlined"
      id="button1"
      @click="sub"
    >未婚</button>
    <button type="button" class="mui-btn mui-btn-block mui-btn-outlined" @click="sub">离异</button>
    <button type="button" class="mui-btn mui-btn-block mui-btn-outlined" @click="sub">丧偶</button>
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
      console.log(result.data.code);
      if (result.data.code == -1) {
        location.href = jvw_url;
      }
    });
  },
  methods: {
    sub(e) {
      var marital_status = e.target.innerHTML;
      this.axios
        .get(`${jvw_url_server}info4?marital_status=${marital_status}`)
        .then(result => {
          if (result.data.code == 1) {
            location.href = `${jvw_url}information5`;
          }
        });
    }
  }
};
</script>

<style scoped>
button,
a,
.mui-title {
  color: #666;
}
button {
  margin-top: 3vh;
}
#button1 {
  margin-top: 60vw;
}
img {
  width: 100vw;
  position: fixed;
  top: 40px;
}
#bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  top: 0;
  left: 0;
  width: 100vw;
}
</style>
