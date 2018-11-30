<template>
  <div class="goods">
    <div class="top" >
      <div class="back fl" @click='backto'>
        <!-- @click="back"-->
        <i class="iconfont icon-xitongfanhui1"></i>
      </div>
      <div class="xq">详情</div>
      <div class="ri fr">
        <router-link tag='i'  to='/cart' class="fa fa-shopping-cart"></router-link>
      </div>
    </div>
    <div class="goodss">
      <div class="goods-img">
        <img class="img" :src="img">
        <span class="tem">
          <i class="iconfont icon-duoyun"></i>
          &nbsp;{{21}}~{{25}}℃
        </span>
        <span class="goods-id">编号：{{newId!=undefined?newId:data.base.product_id}}</span>
      </div>
      <div class="info">
        <div class="txt">{{(list.name?list.name.split('-')[1]: '【品质出行】')}}</div>
        <div class="tit">{{list.name}}</div>
        <div class="price">
          <span class="pri"></span>
          <span
            class="pri"
          >￥{{(list.product_price_display)?(list.product_price_display.double_cny).toFixed(0):(list.product_price_display.adult)}}</span>
          <span
            class="old"
          >￥{{((list.product_price_display)?list.product_price_display.double_cny*1.2:list.product_price_display.adult*1.2).toFixed(0)}}</span>
          <a>
            <i class="fa fa-share-alt fr" ></i>
          </a>
        </div>
      </div>
      <div class="security">
        <div class="sec" v-for="(item,index) in sec" :key="index">
          <i :class="item.icon" class="ii fl"></i>
          <div class="ty">{{item.wen}}</div>
        </div>
      </div>
      <div class="juli">
        出发地 · 距离您约 {{ju*23}} Km
        <div class="fr" style="color: #878787;font-size: 0.36rem;">查看地图 > &nbsp;&nbsp;&nbsp;</div>
      </div>
      <div class="play">
        <div class="you">
          <span>游玩项目</span>
        </div>
        <ul>
          <li v-for="(item,index) in play" :key="index">
            <a href="##">
              <i :class="item.iconn" class="iconn"></i>
              <div class="zi">{{item.zi}}</div>
            </a>
          </li>
        </ul>
      </div>
      <div class="limit">
        <div class="shi">
          <div class="div">
            <i class="fa fa-tags"></i>限时抢购
            <div class="dao fr">距结束：7天
              <span>05</span>:
              <span>{{minute}}</span>:
              <span>{{second}}</span>
            </div>
          </div>
          <img class="shiimg" :src="shiimg">
          <p class="pp">{{pp}}</p>
          <span class="qian">￥{{qian}}.00</span>
          <span class="qiang">
            <a href="##">马上抢</a>
          </span>
        </div>
      </div>
      <div class="fangfa">
        <div class="ff">
          <span>预订须知</span>
        </div>
        <p>使用方法
          <br>
          <br>1.如何使用:成功预订后您将收到电子凭证码短信，请凭预定短信、电子凭证码到景区验票机验票后取票。
          <br>2.预约信息:无需预约
          <br>3.预订信息:即时预订，随订随走
          <br>4.如何使用:成功预订后您将收到电子凭证码短信，请凭预定短信、电子凭证码到景区验票机验票后取票。
          <br>5.开放时间:
          <br>a.平日: 10:00至18:00
          <br>b.周未及节假日: 9:30至18:00c.其他备注:平日
          <br>
          <br>
        </p>

      </div>
      <div class="attr">
        <div class="att">
          <span>附近景点</span>
        </div>
        <div class="jingdian">
          <ul>
            <li v-for="(item,index) in fu" :key="index">
              <a href="##">
                <img class="fu-img" :src="item.image">
                <span class="qqq">￥{{item.origin_price}}</span>
                <p class="title">{{item.name.slice(0,11)}}</p>
                <div class="xing">
                  <i class="iconfont icon-shoucangfill"></i>
                  <i class="iconfont icon-shoucangfill"></i>
                  <i class="iconfont icon-shoucangfill"></i>
                  <i class="iconfont icon-shoucangfill"></i>
                  <i class="iconfont icon-shoucangfill"></i> 5.0
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="abc"></div>
      <div class="add-cart" @click="addCart">加入购物车</div>
    </div>
    <div id='dv' v-show="selectDate">
      <div class="stime">请选择出行时间:</div>
    <ul class="time" >
		
      <li  :class='{gg:red==index}' v-for='(item,index) in arr' :key='index' @click="color(index,$event)" >{{item}}</li>
  
    </ul>

    </div>
    <div class="mask" v-show="selectDate" @click='cancelSelect'></div>
  </div>
</template>

<script>
     import { Toast, InfiniteScroll } from "mint-ui";
import { setTimeout } from 'timers';
import Vue from 'vue'
export default {
  name: "Goods",
  inject: ["hidden","reload"],
  components: {},
  data() {
    return {
      selectDate: false,
      id: "",
      color:true,
      newId: [],
      list: [],  
      red:'',
	    data: [],
      date:'',
      arr:[],
      img: "",
      goodsimg: [],
      goodsid: [],
      tem1: [],
      tem2: [],
      txt: [],
      price: [],
      old: [],
      setOutTime:'',
     oldlist:[],
      sec: [
        {
          icon: "iconfont icon-haoping",
          wen: "放假网出票保障"
        },
        {
          icon: "iconfont icon-xinxi",
          wen: "今日可订"
        }
      ],
      dif: [],
      ju: [],
      play: [
        {
          iconn: "iconfont icon-listzhusu",
          zi: "住宿"
        },
        {
          iconn: "iconfont icon-listcanyin",
          zi: "餐饮"
        },
        {
          iconn: "iconfont icon-listyule",
          zi: "娱乐"
        }
      ],
      shiimg: [],
      pp: [],
      qian: [],
      oid:'',
      fu: [],
      minutes: 59,
      seconds: 0,
      tim:false,
      list:[],
      cart:false,
      gg:'',
    };
  },
  

  methods: {
    backto(){
        this.$router.back(-1)
    },
    cancelSelect(){
 this.selectDate=false
  this.tim=false
     this.cart=false
   this.setOutTime=''
    },
    //选择日期
    color(index,e){
      //console.log(e.target.innerHTML)
    this.setOutTime=e.target.innerHTML
    this.cart=true
    console.log(this.setOutTime)
    console.log(this.cart)
      this.red=index
    },
    //加入购物车
    addCart() {
      if(window.localStorage.getItem('user')){
      console.log(this.arr)
      this.selectDate=true
      if(!this.tim){
        this.arr=[];
        this.tim=true
      console.log(this.$route.params.newId);
      console.log(this.id);
      var d = new Date();
      // time=time.toDateString()
      // let year = d.getFullYear();
      // let month = d.getMonth() + 1;
      // let date = d.getDate();
      // let hour = d.getHours();
      // let min = d.getMinutes();
      // let sec = d.getSeconds();
      // hour = String(hour).padStart(2,'0');
      // min = String(min).padStart(2,'0');
      // sec = String(sec).padStart(2,'0');
	  // return `${year}-${month}-${date} ${hour}:${min}:${sec}`
			  //let arr=`${year}-${month}-${date}`
        var s=d.getTime()
			  for(var i=0;i<10;i++){
        
          let nextDay=new Date(s+1000*60*60*24*i)
           let year=nextDay.getFullYear()
           let date=nextDay.getDate()
           let mouth=nextDay.getMonth() + 1
           date=String(date).padStart(2,'0')
            mouth=String(mouth).padStart(2,'0')
            let time=`${year}-${mouth}-${date}`
          this.arr.push(time);
          //加入购物车
       
        }
        console.log(this.cart)

          }
            if(this.cart){
          //console.log(1)
        let instance = Toast({
            message: "加入购物车成功",
            iconClass: "fa fa-check"
          });

        setTimeout(()=>{
        instance.close()
          this.reload()
            this.selectDate=false
            console.log("状态:"+this.selectDate)
        },1000)
          this.cart=false
         
          var sTime=this.setOutTime
          console.log(this.setOutTime)
             console.log(this.id)
   
            //  console.log(this.$route.params.newId);
            // console.log(this.oid)
              // this.$router.push({ name: 'Goods', params: { newId: id }})
            // this.$router.push({name:'cart',params:{good:this.oid}})
            console.log(this.data)
          
            console.log('加入购物车成功')
            console.log(this.oldlist)
          if(this.oldlist){
            let a=this.oldlist
        let s=a.split(',')
    this.list=[]
    this.list.push((this.id+'&'+this.setOutTime))

     //console.log(Array.isArray(s) )
      this.list=this.list.concat(s)

     let str=new Set(this.list)
     var arr=Array.from(str)//set 转换为真正的数组
     window.localStorage.setItem('cart',arr)
     console.log(arr)
     }else{
       this.gg=this.id+'&'+this.setOutTime
console.log(this.gg)
       //(this.list).unshift(this.gg)
     
       this.list=[]
      //  console.log(this)
     this.list.push(this.gg)
     //console.log(Array.isArray(s) )
  

     let arry=new Set( this.list)
     var nowarr=Array.from(arry)//set 转换为真正的数组
     window.localStorage.setItem('cart',nowarr)
     console.log(nowarr)
     }
            // this.$axios.get('/gg/api/cart/goodslist',{params:{
            //  desc:this.id
            // }})
            // .then((res)=>{
            //   console.log(res)
            // })
            
          }
    //   console.log(this.arr)
    //   var nextDay=new Date(s+1000*60*60*24*i)
     
    //   console.log()
		// this.date=`${year}-${month}-${date}`
    //   console.log(`${year}-${month}-${date}} `);
   
    }else{
       let instance = Toast({
            message: "请先登录账户"
          }); 
    }
    },
    opacity(){
      window.onscroll=()=>{
        var s=document.documentElement.scrollTop
        if(s>300){
          this.color=false
        }else{
          this.color=true
        }
      }
    } ,
    getGOODs() {
      this.$axios
        .get(`https://app.toursforfun.com/api/product/${this.id}`, {
          params: {}
        })
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.data = res.data;
          this.list = res.data.info;
          this.newId = res.data.base.product_old_id;
          this.img = res.data.base.media.image_url;
          this.oid=res.data.base.product_old_id
          //res.data.base.media.image.extra 轮播图
          //console.log(this.newid)
          //console.log(this.list.name)
        });
    },
    
    getGoods() {
      this.$axios
        .get("/aapi/api/search/keywords", { params: { keyword: "广州" } })
        .then(res => {
          this.goodsimg = res.data.product_list[0].image;
          this.goodsid = res.data.product_list[0].id;
          this.tem1 = res.data.product_list[0].is_switch;
          this.tem2 = res.data.product_list[0].order_count;
          this.txt = res.data.product_list[0].name;
          this.price = res.data.product_list[0].origin_price;
          this.old = res.data.product_list[0].provider_id;
          //					console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    },
    getZa() {
      this.$axios
        .get("/aapi/api/homepage/banner/v1.5.0", { params: {} })
        .then(res => {
          this.dif = res.data.hot_destination[0].title;
          this.ju = res.data.hot_destination[0].id;
          this.shiimg =
            res.data.recommend_products[0].products_info[2][0].image;
          this.pp = res.data.recommend_products[0].products_info[2][0].name;
          this.qian =
            res.data.recommend_products[0].products_info[2][0].origin_price;
          //					console.log(res.data.recommend_products[1].products_info[2])
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFu() {
      this.$axios
        .get("/aapi/api/homepage/banner/v1.5.0", { params: {} })
        .then(res => {
          this.fu = res.data.recommend_products[1].products_info[2];
          //	console.log(res.data.recommend_products[1].products_info[2])
        })
        .catch(err => {
          console.log(err);
        });
    },
    num: function(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    add: function() {
      var _this = this;
      var time = window.setInterval(function() {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59;
          _this.minutes -= 1;
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.seconds = 0;
          window.clearInterval(time);
        } else {
          _this.seconds -= 1;
        }
      }, 1000);
    }
  },
  watch: {
    second: {
      handler(newVal) {
        this.num(newVal);
      }
    },
    minute: {
      handler(newVal) {
        this.num(newVal);
      }
    }
  },
  mounted() {
    this.add();
   // this.opacity();
  },
  created() {
    // https://app.toursforfun.com/api/product/103240203  //API
    this.id = this.$route.query.newId;

    console.log(this.$route);
    this.oldlist=window.localStorage.getItem('cart')
    // console.log(this.id)
    //this.getGoods();
    this.hidden(false);
    this.getZa();
    this.getFu();
    this.getGOODs();
  },
  destoyed() {},
  computed: {
    second: function() {
      return this.num(this.seconds);
    },
    minute: function() {
      return this.num(this.minutes);
    }
  }
};
</script>

<style lang='less' scoped>
/*scoped形成一个作用域*/
@import "../../style/main.less";
.mask{
  position: fixed;
  right: 0;
  left: 0;
  top:0;
  bottom: 0;
  background:rgba(0,0,0,.5);
      z-index: 99;
}
.op{
   background: #00000020;
}
.wh{
  background:#fff;
}
.gg{
		border:1px solid red !important;
		box-shadow: 2px 2px 2px red;
}
#dv{
  display: flex;
  flex-direction: column;
  overflow:hidden;
    width:100%;
     background:#eee;
      position: fixed;
        align-items: flex-start;
       .h(180);
    box-sizing: border-box;
      .bottom(44);
      z-index: 999;
  .padding(0,0,0,20);
  .stime{
    .fs(13);
    text-align: left;
      .h(30);
    .lh(30);
 
  }
.time {
  .h(150);

  width:100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  li {
	.fs(12);
	.h(23);
  .margin(0,10,10,0);
  
  width: 21%;
	border-radius: 3px;
	border:1px solid #ccc;
	box-shadow: 2px 2px 2px gray;
	text-align: center;
	.lh(22);
  }
}
}

.goods {
  background: #fff;
  .top {
    position: fixed;
    z-index: 999;
      background: #00000020;
    .h(40);
    width: 100%;
    display: flex;
    .back,
    .ri {
      height: 100%;
      font-weight: 600;
      color: #fff;
      display: flex;
      .margin(0, 10, 0, 10);
      flex: 1;
      .fs(20);
      text-align: center;
      .lh(40);
      justify-content: center;
      align-items: center;
    }
    .xq {
      .fs(18);
      flex: 6;
      .lh(40);
      text-align: center;
      color: #fff;
    }
  }
  .goodss {
    .h(1800);
    .goods-img {
      position: relative;
      .img {
        width: 100%;
        .h(260);
        z-index: 90;
      }
      .tem {
        .fs(13);
        position: absolute;
        .bottom(18);
        .left(2);
        z-index: 99;
        color: #fff;
        .padding(2, 8, 3, 8);
        background: #ccc6;
        .border-radius(0, 7, 7, 0);
      }
      .goods-id {
        .fs(13);
        position: absolute;
        .bottom(18);
        .right(2);
        z-index: 99;
        color: #fff;
        .padding(2, 8, 3, 10);
        background: #ccc6;
        .border-radius(7, 0, 0, 7);
      }
    }
    .info {
      border-bottom: 1px solid #f0f0f0;
      .h(160);
      .margin(5, 10, 5, 10);
      .txt {
        .fs(20);
        font-weight: 550;
        color: #484848;
      }
      .tit {
        .fs(15);
        color: #464646;
        .margin(5, 0, 0, 0);
      }
      .price {
        .q {
          .fs(13);
          color: deeppink;
          .margin(0, 0, 0, 15);
        }
        .pri {
          .fs(28);
          color: deeppink;
          font-weight: 550;
          font-family: "微软雅黑";
        }
        .old {
          .fs(14);
          color: #c6c6c6;
          text-decoration: line-through;
          .margin(0, 0, 0, 6);
        }
        i {
          .fs(18);
          color: #32121f;
          .margin(20, 15, 0, 0);
        }
      }
    }
    .security {
      .sec {
        .padding(8, 0, 8, 10);
        i {
          .fs(16);
          .padding(0, 10, 0, 5);
          color: #eb1165;
        }
        .ty {
          .fs(13);
          color: #666;
        }
      }
    }
    .juli {
      border-top: 0.18rem solid #e8e8e8;
      border-bottom: 0.18rem solid #e8e8e8;
      .fs(14);
      .padding(15, 0, 15, 20);
    }
    .play {
      .you {
        .fs(18);
        font-weight: 550;
        border-left: 0.15rem solid #eb1165;
        .margin(10, 0, 10, 0);
        span {
          .padding(0, 0, 0, 10);
        }
      }
      ul {
        width: 100%;
        .h(85);
        li {
          float: left;
          display: flex;
          flex-direction: column;
          text-align: center;
          justify-content: center;
          align-items: center;
          width: 25%;
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
          .iconn {
            .fs(30);
            color: #888;
          }
          .zi {
            .fs(14);
            color: #666;
          }
        }
      }
    }
    .limit {
      height: 4rem;
      border-top: 0.18rem solid #e8e8e8;
      border-bottom: 0.18rem solid #e8e8e8;
      .shi {
        .h(40);
        background: linear-gradient(30deg, #ff1a62, #ff745a);
        .div {
          .margin(0, 0, 0, 10);
          .lh(38);
          .fs(18);
          font-weight: 550;
          color: #fff;
          i {
            .fs(18);
            .margin(-20, 5, 0, 0);
            color: #fff;
          }
        }
        .dao {
          .fs(14);
          font-weight: 500;
          .padding(1, 8, 0, 0);
          span {
            .padding(0, 3, 2, 3);
            .margin(3, 3, 3, 3);
            background: #0000009e;
            border-radius: 0.1rem;
          }
        }
        .shiimg {
          .w(120);
          .h(80);
          .margin(16, 0, 0, 20);
          float: left;
          .padding(1, 1, 1, 1);
          border: 1px solid #ccc;
        }
        .pp {
          .fs(14);
          .w(200);
          .h(60);
          .margin(16, 0, 0, 15);
          float: left;
          overflow: hidden;
          color: #484848;
        }
        .pp:active {
          color: red;
        }
        .qian {
          .fs(16);
          color: #eb1165;
          float: left;
          .margin(4, 0, 0, 30);
        }
        .qiang {
          float: left;
          .fs(14);
          .padding(2, 4, 2, 4);
          border: 1px solid #eb1165;
          border-radius: 0.1rem;
          .margin(3, 0, 0, 70);
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
            color: #eb1165;
          }
        }
      }
    }
    .fangfa {
      .ff {
        .fs(18);
        font-weight: 550;
        border-left: 0.15rem solid #eb1165;
        .margin(10, 0, 10, 0);
        span {
          .padding(0, 0, 0, 10);
        }
      }
      p {
        .fs(14);
        color: #888;
        text-decoration: 2rem;
        .padding(10, 10, 10, 10);
        border-bottom: 0.18rem solid #e8e8e8;
      }
    }
    .attr {
      .att {
        .fs(18);
        font-weight: 550;
        border-left: 0.15rem solid #eb1165;
        .margin(10, 0, 10, 0);
        span {
          .padding(0, 0, 0, 10);
        }
      }
      .jingdian {
        ul {
          float: left;
          li {
            .w(160);
            float: left;
            .h(160);
            border: 1px solid #ececec;
            .margin(0, 0, 10, 17);
            position: relative;
            .fu-img {
              .w(160);
              .h(100);
            }
            .qqq {
              .fs(15);
              position: absolute;
              .top(68);
              z-index: 100;
              color: #000;
              .padding(0, 5, 0, 5);
              background: #ccccccc7;
              .border-radius(0, 10, 10, 0);
            }
            .title {
              .fs(14);
            }
            .xing {
              .fs(11);
              float: left;
              .padding(5, 0, 0, 10);
              i {
                color: #eb1165;
              }
            }
          }
        }
      }
    }
  }
  .footer {
    .h(45);
    position: fixed;
    display: flex;
    width: 100%;
    bottom: 0;
    z-index: 999;
    .abc {
      flex: 2;
      background: #fff;
    }
    .add-cart {
      flex: 2;
      background: linear-gradient(30deg, #ff745a, #ff1a62);
      text-align: center;
      .lh(45);
      .fs(18);
      color: #fff;
    }
  }
}
</style>