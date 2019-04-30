<template>
  <div id="app-user">
    <header id="header" class="mui-bar mui-bar-nav">
      <h1 class="mui-title">我</h1>
    </header>
    <div id="portrait">
      <div>
        <table></table>
        <div id="upload_portrait_container">
          <table></table>
          <img src="img/photo.png" alt id="upload_portrait">
        </div>
        <span id="upload_portrait_span">上传头像</span>
      </div>

      <div id="info">
        <div id="name">{{uname}}</div>
        <div>
          <span id="sex">{{sex}}</span>|
          <span id="location">{{location}}</span>|
          <span id="age">{{age}}</span>
        </div>
        <div></div>
      </div>
    </div>

    <nav class="mui-bar mui-bar-tab">
      <a class="mui-tab-item" href="#tabbar">
        <span class="mui-icon">
          <img src="ico/recommend.ico" alt="bar_ico" class="ico">
        </span>
        <span class="mui-tab-label">推荐</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-chat">
        <span class="mui-icon">
          <img src="ico/chat.ico" alt="bar_ico" class="ico">
          <!--<span class="mui-badge">9</span>-->
        </span>
        <span class="mui-tab-label">消息</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-contact">
        <span class="mui-icon">
          <img src="ico/dynamic.ico" alt="bar_ico" class="ico">
        </span>
        <span class="mui-tab-label">动态</span>
      </a>
      <a class="mui-tab-item mui-active" href="#tabbar-with-map">
        <span class="mui-icon">
          <img src="ico/user_active.ico" alt="bar_ico" class="ico">
        </span>
        <span class="mui-tab-label">我</span>
      </a>
    </nav>
  </div>
</template>
<script>
//用于处理用户上传头像的组件
import html2canvas from "html2canvas";
export default {
  components: {
    html2canvas
  },
  mounted() {
    //先把vue对象提取出来
    var vue = this;
    //用本地储存的sessionStorage来判断是否登陆
    var session_phone = sessionStorage.getItem("phone");
    if (!session_phone) {
      // 如果是未登陆状态，跳转到登陆
      location.href = `${jvw_url}login`;
    } else {
      //如果用户是登陆状态:
      //任意查看一个本地储存的变量到底有没有，没有表示还未从数据库里拿到数据，否则就已经拿到过了，不用再发ajax请求了
      //登陆和注册跳转的是这个页面，所以其他页面不用再请求这些数据了
      var isHasData = sessionStorage.getItem("uname");
      if (isHasData == (undefined || null)) {
        console.log("能进判断");
        this.axios
          .get(`${jvw_url_server}session_userdata?phone=${session_phone}`)
          .then(result => {
            //本地储存传过来的数据
            sessionStorage.setItem("birthday", result.data[0].birthday);
            sessionStorage.setItem(
              "character_label",
              result.data[0].character_label
            );
            sessionStorage.setItem("jvw_money", result.data[0].jvw_money);
            sessionStorage.setItem("location", result.data[0].location);
            sessionStorage.setItem("manifesto", result.data[0].manifesto);
            sessionStorage.setItem(
              "marital_status",
              result.data[0].marital_status
            );
            sessionStorage.setItem("salary", result.data[0].salary);
            sessionStorage.setItem("uname", result.data[0].uname);

            //将出生日期转换为年龄
            var birthday = sessionStorage.getItem("birthday");
            var date = new Date();
            var year = date.getFullYear();
            var age = year - birthday.substring(0, 4);
            sessionStorage.setItem("age", age);
            //将性别从数字转换为汉字
            var sex = `${result.data[0].sex == 1 ? "男" : "女"}`;
            sessionStorage.setItem("sex", sex);

            //由于是ajax是异步操作，所以要在数据返回后将vue里的变量赋值
            //在data里直接赋值很可能会取不到
            vue.birthday = sessionStorage.getItem("birthday");
            vue.character_label = sessionStorage.getItem("character_label");
            vue.jvw_money = sessionStorage.getItem("jvw_money");
            vue.location = sessionStorage.getItem("location");
            vue.manifesto = sessionStorage.getItem("manifesto");
            vue.marital_status = sessionStorage.getItem("marital_status");
            vue.salary = sessionStorage.getItem("salary");
            vue.uname = sessionStorage.getItem("uname");
            vue.sex = sessionStorage.getItem("sex");
            vue.age = sessionStorage.getItem("age");
          });
      }
    }
  },

  data() {
    return {
      //将本地储存的值放到组件里
      birthday: "",
      character_label: "",
      jvw_money: "",
      location: "",
      manifesto: "",
      marital_status: "",
      salary: "",
      uname: "",
      sex: "",
      age: ""
    };
  },
  methods: {}
};
</script>
<style scoped>
.ico {
  height: 1.5rem;
}
#header {
  background: linear-gradient(to bottom right, #ff3cad, #a74ddb);
}

.mui-title {
  color: white;
}
#portrait {
  width: 100vw;
  background: #fff;
  height: 200px;
  display: flex;
}
#upload_portrait {
  height: 60px;
  margin: auto;
  margin-top: 10px;
  display: block;
}
#upload_portrait_container {
  height: 90px;
  width: 90px;
  background: #fff;
  margin-left: 20px;
  margin-top: 20px;
  border-radius: 10%;
  box-shadow: 0px 0px 15px #aaa;
}
#upload_portrait_span {
  display: block;
  font-size: 16px;
  color: #fff;
  background: #a74ddb;
  text-align: center;
  width: 94px;
  margin-left: 18px;
  position: relative;
  top: -5px;
  border-radius: 0 0 8% 8%;
}
/* #name{

} */
</style>
