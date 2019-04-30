<template>
  <div id="app-login">
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">登录</h1>
    </header>
    <form class="mui-input-group">
      <div class="mui-input-row" id="phone">
        <!-- <img src="/img/user_name.png" alt=""> -->
        <input type="text" placeholder="请输入手机号" id="_phone">
      </div>
      <div class="mui-input-row" id="upwd">
        <!-- <img src="/img/upwd.png" alt=""> -->
        <input type="password" placeholder="请输入登录密码" id="_upwd">
      </div>
      <div class="mui-button-row" id="agree">
        <button
          type="button"
          class="mui-btn mui-btn-primary"
          @click="login"
        >登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
      </div>
    </form>
    <div id="forget">
      <a href="#">忘记密码？</a>
    </div>
    <div id="clause">
      <a href="#">不知道密码？使用手机验证码登录</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      //验证手机号的正则
      var reg1 = /^1\d{10}$/;
      //验证密码的正则
      var reg2 = /^\w{6,20}$/;
      var phone = document.getElementById("_phone");
      var upwd = document.getElementById("_upwd");
      console.log(phone.value)
      if (!reg1.test(phone.value)) {
        this.$toast("请输入正确的11位手机号码");
      } else if (!reg2.test(upwd.value)) {
        this.$toast("密码只能是6-20位数字、字母、下划线的组合");
      } else {
        var data = {
          phone: phone.value,
          upwd: upwd.value
        };
        var url = `${jvw_url_server}login`;
        //不能传对象过去，不认识。要用qs.stringify()将对象序列化成URL的形式·
        var qs = require("qs");
        this.axios.post(url, qs.stringify(data)).then(result => {
          if (result.data.code == 1) {
            //本地储存一个值以判断用户是否登陆
            sessionStorage.setItem("phone", `${data.phone}`);
            location.href = `${jvw_url}user`;
          }
          this.$toast(result.data.msg);
        });
      }
    }
  }
};
</script>
<style scoped>
#app-login {
  position: fixed;
  top: 40px;
  left: 0;
  width: 100vw;
}
.mui-bar {
  background: linear-gradient(to bottom right, #ff3cad, #a74ddb);
}
.mui-title {
  color: white;
}
a {
  color: white;
}
img {
  width: 12vw;
}
button {
  width: 90vw;
  height: 13vw;
}
#phone {
  height: 10vh;
}
#upwd {
  height: 10vh;
}
input {
  height: 16vh !important;
}

.mui-input-group .mui-button-row {
  height: 80vh;
}

#agree {
  padding-top: 20vh;
}
#clause,
#forget {
  position: fixed;
  top: 60vh;
  text-align: center;
  width: 90vw;
  left: 5vw;
}

#forget {
  top: 30vh;
  left: 40vw;
}
span,
a {
  font-size: 0.7rem;
}

#clause a,
#forget a {
  color: #a74ddb;
}
.mui-btn.mui-btn-primary {
  background: linear-gradient(to bottom right, #ff3cad, #a74ddb);
  border: none;
}
</style>
