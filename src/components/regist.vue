<template>
  <div id="app-regist">
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">注册</h1>
    </header>
    <form class="mui-input-group">
      <div class="mui-input-row" id="phone">
        <input type="text" placeholder="请输入手机号" id="_phone">
      </div>
      <div class="mui-input-row mui-password" id="upwd">
        <input type="password" class="mui-input-password" placeholder="请设置登录密码(6-20位)" id="_upwd">
      </div>
      <div class="mui-button-row" id="agree">
        <button type="button" class="mui-btn mui-btn-primary" @click="submit">同意协议并注册</button>
      </div>
    </form>
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
    submit() {
      //验证手机号的正则
      var reg1 = /^1\d{10}$/;
      //验证密码的正则
      var reg2 = /^\w{6,20}$/;
      var phone = document.getElementById("_phone");
      var upwd = document.getElementById("_upwd");
      if (!reg1.test(phone.value)) {
        this.$toast("请输入正确的11位手机号码");
      } else if (!reg2.test(upwd.value)) {
        this.$toast("密码只能是6-20位数字、字母、下划线的组合");
      } else {
        var data = {
          phone: phone.value,
          upwd: upwd.value
        };
        var url = `${jvw_url_server}regist`;
        //不能传对象过去，不认识。要用qs.stringify()将对象序列化成URL的形式·
        var qs = require("qs");
        this.axios.post(url, qs.stringify(data)).then(result => {
          if (result.data.code == 1) {
            //本地储存一个值以判断用户是否登陆
            sessionStorage.setItem("phone", `${data.phone}`);
            location.href = `${jvw_url}information1`;
          }
          this.$toast(result.data.msg);
        });
      }
    }
  },
  mounted() {
    //用于密码显示隐藏的小眼睛的样式修改
    var count = 0;
    var timer = setInterval(function() {
      count++;
      var span = document.querySelector("span.mui-icon.mui-icon-eye");
      if (span != null) {
        span.setAttribute("style", "top:6vh !important");
        clearInterval(timer);
      } else if (count >= 20) {
        clearInterval(timer);
        //第一次进入页面，不刷新就不显示小眼睛的bug？？？？？？？？
        history.go(0);
      }
    }, 10);
  }
};
</script>
<style scoped>
#app-regist {
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

span.mui-icon.mui-icon-eye {
  top: 6vh !important;
}
.mui-input-group .mui-button-row {
  height: 80vh;
}

#agree {
  padding-top: 20vh;
}
#clause {
  position: fixed;
  top: 60vh;
  text-align: center;
  width: 90vw;
  left: 5vw;
}
span,
a {
  font-size: 0.7rem;
}
span {
  color: rgb(146, 146, 146);
}
#clause a {
  color: #a74ddb;
}
.mui-btn.mui-btn-primary {
  background: linear-gradient(to bottom right, #ff3cad, #a74ddb);
  border: none;
}
</style>
