<template>
    <div class="reg-box">
        <div class="reg-top">
       <router-link tag='span' to='/My' class="reg-back"> < </router-link>
       <span class="reg-title">注册</span>
       </div>
       <div class="r-mid">
           <input type="text" placeholder="输入手机号码" class='r-phone' v-model='phone'>
           <input type="text" placeholder="输入图形验证码" class='r-phone' v-model='check'>
           <div class="code  " @click="refreshCode">
    <numb :identifyCode="identifyCode"></numb>
  </div>
           <input type="password" placeholder="输入密码" class='r-phone' v-model='pass'>
           <input type="password" placeholder="再次输入密码" class='r-phone' v-model='passed'>
            <div class="r-button" @click="btn">注册</div>
                <!-- <div class="custom-control custom-checkbox gg">
  <input type="checkbox" class="custom-control-input" id="customCheck1" >
  <label class="custom-control-label" for="customCheck1">同意放假周边游服务协议</label>
</div> -->
        <div class="gg"><input type="checkbox" class="ch"><label class="aaa" >同意放假周边游<span>服务协议</span></label></div>
          
        </div>
        <!-- <div class="" @click="refreshCode">
            <numb :ident='ident'> </numb>
        </div> -->
        
        <div class="imggg"><img src="../../../../static/image/cheng.jpg" alt="" class="imggg"></div>
         
    </div>
</template>

<script>
import Vue from 'vue';
import numb from '../../common/Number'
import { Toast,InfiniteScroll } from 'mint-ui';
//Vue.use(Toast);
export default {
  inject:['reload','hidden'],
  name: "reg",
  components:{
      numb
  },
  data() {
    return {
      phone: "",
      check: "",
      pass: "",
      passed: "",
      toast: "",
     identifyCodes: "1234567890",
      identifyCode: ""
    };
  },
  mounted(){
this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
      randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
       refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
      makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    }
,
    btn() {
       // console.log(this.check )
       // console.log(this.identifyCode )
       // console.log( window.localStorage.getItem('reg'))
      if (this.phone && this.check && this.pass && this.passed) {
          if(this.check==this.identifyCode){
              window.localStorage.setItem('reg',this.phone)
             window.localStorage.setItem('pass',this.pass)

  let instance = Toast({
  message: '注册成功',
  iconClass: 'fa fa-check '
});
        setTimeout(() => {
          instance.close();
            
          this.$router.replace("/login");
this.reload()
        }, 1500);
        console.log("ok");
          }else{
              let instance = Toast({
  message: '请输入正确的验证码',
  iconClass: 'fa fa-check '
});
        setTimeout(() => {
          instance.close();
        }, 1000);

          }
      
      } else {
        console.log("不能为空");
          let instance = Toast('请填写全部信息');
        setTimeout(() => {
          instance.close();
        }, 1000);

      }
    }
  },
   created(){
   this.hidden(false)
    //this.$store.commit('Fshowchange',false)
  },
  updated() {
      
  },
  destroyed(){
     this.reload()
       this.hidden(true)
  }
};
</script>

<style lang='less' scoped>

@import "../../../style/main.less";
@import "../../../../static/css/bootstrap.css";
.aaa {
  .margin(0, 0, 0, 0);
}
.code{
    position: absolute;
   .w(89);
   .h(40);
   .right(40);
   .top(78);
}
.reg-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
  .imggg {
    width: 100%;
  }
  .r-mid {
    background: white;
    .padding(0, 25, 38, 25);
    box-sizing: border-box;
    .gg {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      .h(80);
      .ch {
        .margin(0, 5, 0, 0);
      }

      .custom-control-label {
        .h(22);
        .lh(60);
      }

      text-align: center;
      .fs(13);
    }
    .r-button {
      display: block;
      .margin(40, 0, 0, 0);
      background: #ff87b5;
      box-shadow: 0 2px 3px #ff87b5;
      width: 100%;
      .h(50);
      .fs(16);
      text-align: center;
      .lh(50);
      color: white;
      outline: none;
      border-radius: 20px;
    }
    position: relative;
    .r-phone {
      border: 0;
      .fs(14);
      border-bottom: 1px solid #efeff0;
      //text-align: center;
      color: efeff0;
      outline: none;
      .h(60);
      width: 100%;
    }
  }
  .reg-top {
    text-align: center;
    .h(60);

    .reg-back {
      position: absolute;
      .left(15);
      .fs(33);
      .top(10);
      color: gray;
    }
    .reg-title {
      .fs(19);
    }
  }
}
</style>
