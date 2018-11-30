<template>
	<div class="table">
<!----------我们的承诺------->
	<div class="we">
		<ul>
			<li class="wo">我们的承诺</li>
			<li>
				<i class="iconfont icon-duigou1"></i>优质产品
			</li>
			<li>
				<i class="iconfont icon-duigou1"></i>放心价格
			</li>
			<li>
				<i class="iconfont icon-duigou1"></i>退款保障
			</li>
			<li>
				<i class="iconfont icon-duigou1"></i>24h客服
			</li>
		</ul>
	</div>
<!-------icon列表-------->
	<div class="wan">
		<ul><!-- :href="item" v-for='(item,index) in table' :key='index'-->
			<a  @click='getlist'><li><img src="../../../static/image/01.gif"/>行程用车</li></a>
			<a  @click='getlist'><li> <img src="../../../static/image/02.png"/> 自助游 </li></a>
			<a  @click='getlist'><li> <img src="../../../static/image/03.png"/> 跟团游 </li></a>
			<a  @click='getlist'><li> <img src="../../../static/image/04.png"/> 景点门票 </li></a>
			<a  @click='getlist'><li><img src="../../../static/image/05.png"/>购物优惠 </li></a>
			<a  @click='getlist'><li><img src="../../../static/image/06.png"/>定制旅游</li></a>
			<a  @click='getlist'><li><img src="../../../static/image/07.png"/>精选酒店 </li></a>
			<a  @click='getlist'><li><img src="../../../static/image/08.gif"/>领券中心 </li></a>
		
		</ul>
	</div>
	<div class="fujin">
	 <img src="../../../static/image/fujin.png"/> 
	</div>
<!---------限时抢购模块--------->
		<div class="time">
			<i class="iconfont icon-shijian"></i>限时抢购
		</div>
<div class="lun">
	<div class="swiper-container1">
	<div class="swiper-wrapper">
        <div class="swiper-slide" v-for='(iten,index) in lun' :key='index'>
	        <img class="tu" :src="iten.thumb" alt="" />
	        <span class="place">{ {{iten.properties[0].value}} }</span>
	        <a class="aa" href=""><span>{{iten.name}}</span></a>
	        <span class="pla">￥{{iten.now_price}}</span>
	        <span class="price">￥{{iten.was_price}}</span>
	        <a class="aaa"><span>点击抢购</span></a>
       </div>
    </div>
    <div class="swiper-pagination"></div>
</div>
</div>
<!-------------周边热门城市模块------>
<div class="hot" style="margin-top:0.3rem;">
	<i class="iconfont icon-buxing"></i>周边热门城市/景区
	<span class="mu">目的地推荐</span>
	<div class="hotcity">
		<div id="swiper-container3">
	<div class="swiper-wrapper">
        <div class="swiper-slide" v-for='(item,index) in hot' :key='index'>
        	<div class="meng">
        	<span>{{item.title}}</span>	
	        <img :src="item.image" alt="" />
        	</div>
       </div>
   </div>
</div>

	</div>
	<div class="city">
		<div class="swiper-container4">
	<div class="swiper-wrapper">
        <div class="swiper-slide" v-for='(item,index) in city' :key='index'>
        	<span class="cc">{{item.title}}</span>	
       </div>
    </div>
    <div class="swiper-pagination"></div>
</div>
	</div>
</div>

<!------------------推荐景点模块------------>
<div class="goods" style="margin-top:0.25rem;">
	<i class="iconfont icon-shizhong"></i>推荐景点
	<span class="mu">用心推荐</span>
</div>
</div>
</template>

<script>
import Swiper from 'swiper';
import Vue from 'vue'
	export default{
		name:'Table',
		components:{},
		data(){
			return{
				name:'table',
				table:[],
				lun:[],
				hot:[],
				city:[],
			
			}
		},
		methods:{
				 getlist(){

      
      let keyword='广州'
      this.$router.push({ name: 'list', params: { userId: keyword }})
    },
			getData(){
				this.$axios.get('/bpi/index/_index.html',{ params:{  }})
			.then((res)=>{
					this.table=res.data.icon.list
					console.log(res.data.icon.list)
				})
			.catch((err)=>{
					console.log(err)
				})
			},
			getLun(){
				this.$axios.get('/bpi/index/_index.html',{ params:{  }})
			.then((res)=>{
					this.lun=res.data.hot.list[5].products
//					console.log(res.data.hot.list[5].products)
					Vue.nextTick(()=>{
			    var swiper = new Swiper('.swiper-container1', {
			      pagination: {
			        el: '.swiper-pagination',
			        dynamicBullets: true,
			      },
			    });
					})
				})
			.catch((err)=>{
					console.log(err)
				})
			},
			gethot(){  
				this.$axios.get('/aapi/api/homepage/banner/v1.5.0',{ params:{ }})
			.then((res)=>{
					this.hot=res.data.hot_destination
//					console.log(res.data.hot_destination)
					Vue.nextTick(()=>{
			    var mySwiper3 = new Swiper('#swiper-container3',{
				effect : 'coverflow',
				slidesPerView: 3,
//				centeredSlides: true,
				})
					})
				})
			.catch((err)=>{
					console.log(err)
				})
			},
			getcity(){  
				this.$axios.get('/aapi/api/homepage/banner/v1.5.0',{ params:{ }})
			.then((res)=>{
					this.city=res.data.hot_destination
//					console.log(res.data)
					Vue.nextTick(()=>{
			    var mySwiper = new Swiper('.swiper-container4',{
slidesPerView : 3,
//centeredSlides : true,
})
					})
				})
			.catch((err)=>{
					console.log(err)
				})
			}
		},
		mounted(){
			
		},
		created(){
			this.getData();
			this.getLun();
			this.gethot();
			this.getcity();
		},
		destoyed(){
		}
	}
</script>

<style lang='less' scoped>  /*scoped形成一个作用域*/
@import "../../style/main.less";
@import '../../../node_modules/swiper/dist/css/swiper.css';
.table{
}
.we{.h(40);
.wo{.fs(13px);color:#ea2a73;}
ul{.h(40);background: #f9e9dd;
	display: flex;
	li{float: left;color: #958e88;
		.fs(10);text-align: center;
	    flex: 1;display: flex;
	    justify-content: center;
	    align-items: center;.padding(0,5,0,5);
	    i{color: #fd6862;.fs(10);.margin(2,4,0,0)}
	}
	}
}

.wan{background:#fbfbf9;
	ul{display: flex;flex-wrap: wrap;
	a{
		display:inline-block;width: 25%;.h(100);
		li{ display: flex;color:#000;
		    flex-direction: column;
		    text-align: center;
		    justify-content: center;
		    align-items: center;
		    width: 100%;height: 100%;
		    .fs(12);.lh(30);
		    img{
		    box-shadow: 1px 2px 2px #fdcdd9;
    		border-radius: 50%;.w(43);
		    }
		}
	}
	}
}
.fujin{
	img{.w(375)}
}
.time,.hot,.goods{
	.fs(15);.lh(30);font-weight: 550;color:#141414;
	width: 100%;background:#fff;.padding(5,0,6,0);
	i{.fs(18);float:left;.padding(0,10,0,15);font-weight: 600;}
}
.lun{
	overflow: hidden;position: relative;
	.h(125);background:#fff;.padding(0,0,5,10);
	.swiper-slide{width: 100%!important;}
	.swiper-pagination{position: absolute;}
	img{.w(135);.h(100);border-radius:5px;float:left;}
	.place{.fs(14);float:left;.padding(0,5,0,15);color: dodgerblue;}
	.pla{.fs(15);color:red;float:left;.padding(7,5,0,5);}
	.aa{.fs(14);float:left;.padding(5,5,10,10);box-sizing: border-box;
	    .w(220);font-weight: 600;.h(46);    overflow: hidden; text-overflow: ellipsis;}
    .price{.fs(12);color:gray;float:left;.padding(10,0,0,0);text-decoration: line-through;}
    .aaa{display: inline-block;background: linear-gradient(30deg,#ff1a62,#ff745a);color: #fff;.fs(13);
    .w(80);.h(25);float:left;.margin(6,0,0,16);border-radius:50px;text-align: center;.lh(25);}
}

.mu{.fs(12);color:gray;font-weight: 500;.padding(0,0,15,10);}
.hot{
	.hotcity{background: #fff;overflow: hidden;
		width: 100%;.h(90);.padding(10,0,5,0);
		img{.w(130);.h(90);float:left;}
		.meng{position: relative;
		span{position: absolute;.w(130);.h(90);.lh(90);text-align: center;color: #fff;}
		}
	}
	.city{width: 100%;background: #fff;overflow: hidden;
	.swiper-slide{.w(100)!important;
	.cc{.w(70);.h(22);background: #fff;border: 1px solid #b1b1b1;.margin(15,15,15,15);font-weight: 500;
	    display: inline-block;.fs(13);text-align: center;.lh(22);border-radius:0.9rem;color: #595959;}
	}
	}
}
</style>