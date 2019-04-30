<template>
  <div id="app-information3">
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">完善资料(2/7)</h1>
    </header>

    <!--城市选择器-->
    <v-distpicker
      type="mobile"
      @selected="onSelected"
      :province="select.province"
      :city="select.city"
      :placeholders="placeholders"
      id="city"
      hide-area
    ></v-distpicker>

    <!-- 一个虚拟的按钮用于触发选完地址后的弹窗 -->
    <button
      id="confirmBtn"
      type="button"
      class="mui-btn mui-btn-blue mui-btn-outlined"
      style="display:none"
    ></button>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker"; // 城市选择器
export default {
  name: "citySelect",
  props: ["cites"],
  data() {
    return {
      placeholders: {
        province: "请选择所在省份",
        city: "请选择所在城市"
      },
      select: {
        province: "",
        city: ""
      },
      citys: "",
      location:"",
    };
  },
  components: {
    "v-distpicker": VDistpicker
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
  mounted() {
    var vue=this
    document.getElementById("confirmBtn").addEventListener("click", function() {
      var btnArray = ["否", "是"];
      mui.confirm("确认地址进入下一步？", "亲爱的：", btnArray, function(e) {
        if (e.index == 1) {
          console.log("已确认地址");
          //确认地址后,将地址存到数据库
          vue.axios.get(`${jvw_url_server}info2?location=${vue.citys}`).then(result => {
            if (result.data.code == 1) {
              location.href = `${jvw_url}information3`;
            }
          });
        } else {
          console.log("取消确认地址");
        }
      });
    });
  },
  methods: {
    // 城市选择
    onSelected: function(data) {
      //在确认地址后，会调用这个变量
      this.citys = data.province.value + data.city.value;
      console.log(this.citys);
      console.log(confirmBtn);
      confirmBtn.click();
    }
  }
};
</script>
<style scoped>
a,
.mui-title {
  color: #666;
}
</style>
