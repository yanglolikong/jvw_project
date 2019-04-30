<template>
  <div id="app-login-regist">
    <img src="/img/title1.png" alt id="title">
    <img src="/img/bq.png" alt id="bq">

    <button type="button" class="mui-btn mui-btn-royal" @click="regist">
      注册
      <router-link to="/regist" id="r1"></router-link>
    </button>
    <button type="button" class="mui-btn mui-btn-danger mui-btn-outlined" id="login" @click="login">
      登陆
      <router-link to="/login" id="r2"></router-link>
    </button>
    <div id="clause">
      <span>已经阅读和同意&nbsp;</span>
      <a href="#">佳娃网的服务协议</a>
      <span>&nbsp;和&nbsp;</span>
      <a href="#">个人信息保护政策</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    regist() {
      console.log(1)
      r1.click();
    },
    login() {
      console.log(2)
      r2.click();
    }
  }
};
</script>
<style scoped>
#app-login-regist {
  background: url("/img/l_r1.jpg");
  background-size: 350vw;
  background-position: 43% 0%;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0px;
  left: 0px;
}

button {
  width: 40vw;
  height: 6vh;
  position: fixed;
  top: 80vh;
  left: 7vw;
  color: white;
}

#title {
  width: 70vw;
  position: fixed;
  top: 10vh;
  left: 10vw;
}
#bq {
  width: 20vw;
  position: fixed;
  top: 7vh;
  left: 61vw;
}

#login {
  left: 53vw;
}
span,
a {
  font-size: 0.7rem;
}
span {
  color: rgb(146, 146, 146);
}
a {
  color: rgb(187, 109, 86);
}
#clause {
  position: fixed;
  top: 91vh;
  text-align: center;
  width: 90vw;
  left: 5vw;
}
</style>

