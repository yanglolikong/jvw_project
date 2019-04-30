<template>
  <div id="app-information5">
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">完善资料(5/7)</h1>
    </header>
    <div id="bg"></div>
    <img src="/img/cat.png" alt>
    <button
      type="button"
      class="mui-btn mui-btn-block mui-btn-outlined"
      id="button1"
      disabled="disabled"
      @click="sub"
    >你的月收入</button>
    <button type="button" class="mui-btn mui-btn-block mui-btn-outlined" @click="sub">3000元以下</button>
    <button type="button" class="mui-btn mui-btn-block mui-btn-outlined" @click="sub">3001-5000元</button>
    <button type="button" class="mui-btn mui-btn-block mui-btn-outlined" @click="sub">5001-8000元</button>
    <button type="button" class="mui-btn mui-btn-block mui-btn-outlined" @click="sub">8001-12000元</button>
    <button type="button" class="mui-btn mui-btn-block mui-btn-outlined" @click="sub">12001-20000元</button>
    <button type="button" class="mui-btn mui-btn-block mui-btn-outlined" @click="sub">20001-50000元</button>
    <button type="button" class="mui-btn mui-btn-block mui-btn-outlined" @click="sub">50000元以上</button>
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
      var salary = e.target.innerHTML;
      this.axios
        .get(`${jvw_url_server}info5?salary=${salary}`)
        .then(result => {
          if (result.data.code == 1) {
            location.href = `${jvw_url}information6`;
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
  margin-top: 1vh;
  height: 5vh;
  line-height: 0;
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
