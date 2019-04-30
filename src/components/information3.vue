<template>
  <div id="app-information3">
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">完善资料(3/7)</h1>
    </header>
    <div id="bg"></div>
    <img src="/img/birthday.jpg" alt="" id="birthday">
    <div class="selector selectYear" @click="selectYear">
      <div class="show_year" id="show">
        <!-- <p v-if="!isClicked">年</p>
        <p v-if="isClicked">{{year}}</p>-->
        <!-- <i class="icon"></i> -->
      </div>
    </div>

    <mt-datetime-picker
      v-model="dateValue"
      type="date"
      ref="datePicker"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
      :endDate="new Date()"
      @confirm="handleConfirm"
    ></mt-datetime-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      year: "",
      dateValue: "",
      birthday: "",
      age: "",
      isClicked: false,
      startDate: new Date(1970, 0, 1)
    };
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
  mounted() {
    show.click();
    var timer = setInterval(function() {
        //修改mint ui原始样式
      if (
        document.querySelector("div.v-modal") != null &&
        document.querySelector(".mint-datetime-action.mint-datetime-cancel") !=
          null &&
        document.querySelector(".mint-datetime-action.mint-datetime-confirm") !=
          null
      ) {
        document
          .querySelector("div.v-modal")
          .setAttribute("style", "opacity:0");
        document
          .querySelector(".mint-datetime-action.mint-datetime-cancel")
          .setAttribute("style", "display:none");
        document
          .querySelector(".mint-datetime-action.mint-datetime-confirm")
          .setAttribute("style", "width:100vw");

        clearInterval(timer);
      }
    }, 10);
  },
  methods: {
    selectYear() {
      this.$refs.datePicker.open();
    },
    handleConfirm(value) {
      this.year = value.getFullYear();
      this.month = value.getMonth() + 1;
      this.date = value.getDate();
      this.isClicked = true;
      this.birthday = value.toLocaleDateString();
      this.age = new Date().getFullYear() - this.year;
      console.log("年龄：" + this.age);
      console.log("生日：" + this.birthday);
      //向数据库传递 生日和年龄
      this.axios.get(`${jvw_url_server}info3?birthday=${this.birthday}`).then(result => {
         if (result.data.code == 1) {
              location.href = `${jvw_url}information4`;
            }
       })
    }
  }
};
</script>
<style scoped>
.picker.mint-datetime-picker {
  height: 70vh;
}
div.v-modal {
  opacity: 0;
}
#birthday{
    position:fixed;
    top:0;
    left:0;
    width: 100vw;
}
#bg{
     position:fixed;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    background-color: #f9f4de;
    top:0;
    left:0;
    width: 100vw;;
}
a,
.mui-title {
  color: #666;
}
</style>

