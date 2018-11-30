<template>
    <div class="con">
        <div class="l-top">
            <img src="../../../../static/image/login.jpg" alt="">
            <div @click="back" class="back"> 
            	<i class="iconfont icon-xitongfanhui1"></i>
            </div>
            <div class="l-left"><span >用户名登录</span>
                <div class="ego"></div>
            </div>
        </div>
        <div class="l-mid">
            <input type="text" placeholder="请输入输入用户名" class='phone username' v-model='name'>
             <input type="text" placeholder="请输入登录密码" class='phone' v-model='pass'>
             <div class="button" @click='ulogin'>登录</div>
             <div class="reg"><span>忘记密码 </span> <span class="l-que" >|</span> <span > 遇到问题 </span></div>
            <div class="m-another">
                <div class="m-left"></div>
                    <router-link tag='span' to='/reg'>新用户注册</router-link>
                  <div class="m-left">

                  </div>
            </div>
            <img src="../../../../static/image/cheng.jpg" alt="" class="imgg">
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { Toast, InfiniteScroll } from "mint-ui";
// Vue.use(InfiniteScroll);
// Vue.use(Toast)
export default {
  inject:['reload','hidden'],
  name: "login",
  data() {
    return {
      name: "",
      pass: ""
    };
  },
  methods: {
    ulogin() {
      if (this.name && this.pass) {
        var reg = window.localStorage.getItem("reg");
        var passw = window.localStorage.getItem("pass");
        console.log(reg + ":" + passw);
        // this.name == reg && this.pass == passw?
        if (this.name ) {
              window.localStorage.setItem('user',this.name)
            this.$store.commit('userlogin',true)
          let instance = Toast({
            message: "登录成功",
            iconClass: "fa fa-check"
          });
          setTimeout(() => {
            instance.close();
            //this.$router.replace("/My");
           this.reload()
            this.$router.push({path:'/My'})
          }, 1500);
          //跳转
          
        }
        
        else{
            let instance = Toast({
            message: "用户名或密码错误,请重新输入",
            iconClass: "fa fa-check"
          });
          setTimeout(() => {
            instance.close();

          }, 1500);
        }
      } else {
        let instance = Toast("用户名与密码不能为空");
      
      setTimeout(() => {
        instance.close();
      }, 2000);
      }
    },
    back() {
      this.$router.push("/My");
    }
  },
  created(){
    this.hidden(false)
    //this.$store.commit('Fshowchange',false)
  },
  destroyed(){
      //this.$store.commit('Fshowchange',true)
       
       
      
  }
};
</script>

<style lang='less' scoped>
@import "../../../style/main.less";
.con {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
 height: 100;
  overflow: hidden;
  .l-mid {
    background: white;
    .padding(0, 25, 0, 25);
    box-sizing: border-box;
    .w(375);
    .imgg {

      width: 110%;.h(180);
    }
    .m-another {
      .padding(10,0,28,0);
      .h(30);
      display: flex;
      text-align: center;
      justify-content: space-between;
      align-items: center;
      .m-left {
        .w(80);
        .h(0);
        border: 1px solid #efeff0;
        display: inline-block;
      }
      span {
        .fs(16);
      }
    }
    .reg {
      .margin(40,0,40,0);
      .fs(14);
      .lh(17);
      color: gray;
      text-align: center;
      .l-que {
        .margin(0, 10, 0, 10);
      }
    }
    .button {
      display: block;
      .margin(40, 0, 0, 0);
      background: #ff87b5;
      box-shadow: 0 2px 3px #ff87b5;
      width: 100%;
      .h(40);
      .fs(16);
      text-align: center;
      .lh(40);
      color: white;
      outline: none;
      border-radius: 20px;
    }
    .phone {
      border: 0;
      .fs(17);
      border-bottom: 1px solid #efeff0;
      color: efeff0;
      outline: none;
      .h(50);
      width: 100%;
    }
  }
  .l-top {
    position: relative;
    width: 100%;
    .h(110);
    overflow: hidden;
    .l-left {
      .margin(50, 0, 0, 0);
      text-align: center;
      .fs(17);
      font-weight: bold;
      color: white;
      .ego {
        .h(0);
        .w(0);
        bottom: 0;
        right: 50%;
        transform: translate(10px);
        position: absolute;
        border-top: 10px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid white;
        border-left: 8px solid transparent;
        z-index: 999;
      }
    }
    .back i{
      .h(35);.fs(20);font-weight: 600;
      color: white;float: left;
      .margin(15,0,0,20);.lh(30);
    }
    img {
      width: 100%;
      .h(140);

      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      z-index: -1;
    }
  }
}
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #efeff0;
}
</style>
