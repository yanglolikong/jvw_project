<template>
  <div id="app-information5">
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">完善资料(6/7)</h1>
    </header>
    <div id="title">
      <p disabled="disabled">选择1-5个性格标签</p>
    </div>
    <div id="labs">
      <div id="labs_container">
        <div class="mui-btn mui-btn-primary">外向</div>
        <div class="mui-btn mui-btn-success">活泼</div>
        <div class="mui-btn mui-btn-warning">幽默</div>
        <div class="mui-btn mui-btn-danger">豪爽</div>
        <div class="mui-btn mui-btn-royal">耿直</div>

        <div class="mui-btn mui-btn-primary">稳重</div>
        <div class="mui-btn mui-btn-success">沉静</div>
        <div class="mui-btn mui-btn-warning">执著</div>
        <div class="mui-btn mui-btn-danger">体贴</div>
        <div class="mui-btn mui-btn-royal">务实</div>

        <div class="mui-btn mui-btn-primary">内向</div>
        <div class="mui-btn mui-btn-success">保守</div>
        <div class="mui-btn mui-btn-warning">敏感</div>
        <div class="mui-btn mui-btn-danger">谨慎</div>
        <div class="mui-btn mui-btn-royal">安静</div>

        <div class="mui-btn mui-btn-primary">友善</div>
        <div class="mui-btn mui-btn-success">自信</div>
        <div class="mui-btn mui-btn-warning">平和</div>
        <div class="mui-btn mui-btn-danger">善变</div>
        <div class="mui-btn mui-btn-royal">任性</div>

        <div class="mui-btn mui-btn-primary">童趣</div>
        <div class="mui-btn mui-btn-success">知足</div>
        <div class="mui-btn mui-btn-warning">羞涩</div>
        <div class="mui-btn mui-btn-danger">忠诚</div>
        <div class="mui-btn mui-btn-royal">倔强</div>

        <div class="mui-btn mui-btn-primary">神经质</div>
        <div class="mui-btn mui-btn-success">完美主义者</div>
        <div class="mui-btn mui-btn-warning">聆听者</div>
        <div class="mui-btn mui-btn-danger">有条理</div>
        <div class="mui-btn mui-btn-royal">好交际</div>
      </div>
    </div>
    <button type="button" class="mui-btn mui-btn-outlined" id="confirm" @click="sub()">确定</button>
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
  mounted() {
    var vue = this;
    //点击性格标签，标签样式改变
    var count = 0;
    var lab = document.querySelectorAll("div.mui-btn");
    for (var item of lab) {
      item.setAttribute("style", "opacity:0.5;border:0");
      item.onclick = function() {
        console.log(this.style.opacity);
        if (this.style.opacity == 0.5) {
          if (count == 5) {
            vue.$toast("最多只能选5个");
          } else {
            count++;
            //选中后，将这个标签的name属性赋值，以便上传数据时有选中的依据
            this.setAttribute("name", "selected");
            this.setAttribute("style", "opacity:1;border:0.3vw solid #ff0");
          }
        } else {
          //取消选中后，将name属性初始化
          this.setAttribute("name", "");
          this.setAttribute("style", "opacity:0.5;border:0");
          count--;
        }
      };
    }
  },
  methods: {
    sub() {
      var labs = document.querySelectorAll("[name='selected']");
      /////////写到这里
      var character_label = "";
      for (var item of labs) {
        character_label += `|${item.innerHTML}`;
      }
      this.axios
        .get(`${jvw_url_server}info6?character_label=${character_label}`)
        .then(result => {
          if (result.data.code == 1) {
            location.href = `${jvw_url}information7`;
          }
        });
    }
  }
};
</script>
<style scoped>
#title {
  margin: auto;
  margin-top: 10vh;
  margin-bottom: 10vh;
  text-align: center;
}
#title p {
  font-size: 5vw;
}
.mui-btn {
  margin: 1.5vw;
}
#labs {
  width: 100vw;
}
#labs_container {
  width: 88vw;
  margin: auto;
}
#confirm {
  position: fixed;
  width: 80vw;
  top: 80vh;
  left: 9vw;
  height: 7vh;
}
#title p,
button,
a,
.mui-title {
  color: #666;
}
</style>
