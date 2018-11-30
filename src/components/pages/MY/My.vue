<template>
    <div class="container">
          <!-- <router-view></router-view> -->
        <div class="m-header">
            <img src="../../../../static/image/top.png" alt="" class="ii" >
          
          
                <div  class="m-user">
              <router-link tag='div' to='/login'  class="user-left">
                  {{info}}
             </router-link>
               <div class="loginOut" @click="LoginOut" v-show="show">退出</div>
                 <div class="user-right"><span @click='gg' v-show="!show">请先登录</span></div>
</div>
        
        </div>
        <div class="adv"><img src="../../../../static/image/crown.jpg" alt=""><span>积分兑换小米8,注册就送1000积分!</span></div>
        <ul class="zero">
            <li v-for='(item,index) in zero' :key="index">
                <div class="z-top">{{item.num}}</div>
                  <div class="z-bottom">{{item.desc}}</div>
            </li>
        </ul>
        <main>
             <!-- <ul>
                 <li v-for='(item,index) in main' :key='index'>

                     <i :class=item.name></i>     
                     <div>{{item.desc}}</div>
                 </li>
             </ul> -->
             <ul>
                 <li v-for='(item,index) in main' :key='index'>
                     <i :class=item.name></i>
                     <div>{{item.desc}}</div>
                 </li>
             </ul>
        </main>
      
    </div>
    
</template>

<script>
export default{
inject:['reload','hidden'],
name:'My',
components:{

},
data(){
    return {a:1,
    show:false,
    info:'登录/注册',
    zero:[{desc:'优惠券',num:0},{desc:'积分',num:0},{desc:'放假基金',num:0}
    
    ],
     main:[
        {
            desc:'全部订单',name:'iconfont icon-quanbudingdan'
        },
        {
            desc:'待付款',name:'iconfont icon-daifukuan'
        },
        {
            desc:'待出游',name:'iconfont icon-yangguangshatan'
        },
        {
            desc:'我的点评',name:'iconfont icon-dianping'
        },
         {
            desc:'我的收藏',name:'iconfont icon-shoucang1'
        },
        {
            desc:'消息',name:'iconfont icon-ai-message'
        },
        {
            desc:'分享给好友',name:'iconfont icon-fenxiang'
        },
        {
            desc:'货币兑换',name:'iconfont icon-huobiduihuan'
        },
         {
            desc:'客服热线',name:'iconfont icon-kefu'
        },
         {
            desc:'更多',name:'iconfont icon-roundadd'
        }
    ]
    }
},
methods:{
    LoginOut(){
       
        window.localStorage.clear()
        
          this.show=false;
          this.info='登录/注册'
           this.reload()
    },
    gg(){
        this.$store.commit('userlogin',true)

    },
   
    checkLogin(){

            if(this.$store.state.user){
           this.info='用户 : '+window.localStorage.getItem('user')
            this.show=true
             //console.log(this.$store.state.login+'未登录')
        }else{
             this.show=false;
        }
    }
},
beforeCreate(){
      // console.log(this.$store.state.user)
},
created() {
    this.hidden(true)
    if(!this.$store.state.login){
        this.$router.replace('/My')
             this.show=false;
    }
    this.checkLogin()
},
mounted(){
//this.reload()
        // console.log(this.$route.params.userId);
        
        // console.log(this.$route)
        console.log(this.$store.state.user)
},
updated(){
   
}


}
</script>

<style lang='less' scoped>
@import "../../../style/main.less";
.loginOut{
    position: absolute;
    .right(30);
    .top(58);
    .fs(15);
    color:rgb(255, 255, 255);
    // color:darkgray;
    z-index: 99;
    .h(40);
    .w(40);
}
.container{
    padding: 0;
    overflow: hidden;
    margin:0;
    display: flex;
   justify-content: center;
    flex-direction: column;
     .w(375);
    height: 100%;
  main{
      ul{
          background: white;
          overflow: hidden;
          li{   
              float: left;display: flex;
              flex-direction:column;
              justify-content: center;
              align-items: center;
              .fs(13);.h(100);width: 33%;.lh(30);
              .border-bottom(1);.border-right(1);
              i{
              }
          }
        li:nth-child(1) i{color:lightseagreen;}
        li:nth-child(2) i{color:orange;}
        li:nth-child(3) i{color:#8bc34a;}
        li:nth-child(4) i{color:coral;}
        li:nth-child(5) i{color:deeppink;}
        li:nth-child(6) i{color:#32b0f1;}
        li:nth-child(7) i{color:lightcoral;}
        li:nth-child(8) i{color:#ff635f;}
        li:nth-child(9) i{color:#607d8b;}
      }
  }
    .zero{
        display: flex;
          justify-content: center;
    background:white;
     .margin(0,0,8,0);
        .h(65);
        li{
          
            .padding(5,0,4,0);
             display: flex;
          justify-content: space-around;
          flex-direction: column;
          align-items: center;
            flex: 1;
            .fs(16);
        .z-top{
            
        }
    .z-bottom{

    }
    }
    }
    .adv{
        .h(28);
        width: 100%;
        background:#fffddf;
            .lh(28);
        
        img{
            .h(28);
            .lh(2);
        }
        span{
           display:inline-block;
           position: absolute;
           margin-bottom: 5px;
           
            .fs(13);
       
        }
    }
.m-header{
    .h(113);
    width:100%;
    // background:url('../../../../static/image/top.png') center ;
    // background-size: cover;
     .ii{
       .h(113);
        width: 100%;
        position: absolute;
        z-index: -999;
    }
    .m-user{
   
        .h(25);
        .w(320);
       .margin(55,0,0,90);
       color:white;
    .user-left{
        .fs(15);
        .w(80);
           height: 100%;
             float: left;
    }
    .user-right{
        float: right;
        height: 100%;
        .w(140);
        .fs(13);
        .border-radius(20px,0,0,20px);
        background:rgba(255,255,255,.4);
        
        .lh(25);
        span{
           .margin(0,0,0,30);
        }
    }
    }
}
}
.i2{
                //    .background-position(-82)
                    background-position:-92px 0!important
               }
               .i3{
                //    .background-position(-170)
                    background-position:-187px 0!important;
               }
               .i4{
                    // .background-position(-250)
                        background-position:-270px 0!important;
               }
            //    .i5{
            //         .background-position(-333)
            //    }
                .i5{
                    // .background-position(-370)
                          background-position:-365px 0!important;
               }
                .i6{
                    // .background-position(-450)
                      background-position:-450px 0!important;
               }
                .i7{
                    // .background-position(-530)
                     background-position:-520px 0!important;
               }
                .i8{
                    // .background-position(-600)
                        background-position:-595px 0!important;
               }
                .i9{
                    // .background-position(-678   )
                      background-position:-670px 0!important;
               }
                .i10{
                    // .background-position(-758  )
                    background-position:-755px 0!important;
               }
               .iconfont{
	.fs(25);
}
</style>
