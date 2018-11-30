<template>
	<div class="found">
		<!--<Footer></Footer>-->
		<div class="toptop">
			<ul>
				<li class="li1">
					<i class="iconfont icon-youxian"></i>
				</li>
				<li class="li2">
					<img src="../../../static/image/faxian.png">
				</li>
				<li class="li3">
					<i class="iconfont icon-haitan"></i>
				</li>
			</ul>
		</div>
<div class="swiper-container" style="margin-top: 1.1rem;">
	<div class="swiper-wrapper">
        <div class="swiper-slide" v-for='(item,index) in lun' :key='index'>
        	<div class="mengg"><!--#  #-->
        	<span>
        		<div class="zizi">
        			#  约伴 | {{item.alias_name}}  # <br />
        			{{item.now_price[1]}} 人关注  · {{item.now_price[4]}} 篇帖子
        		</div>
        	</span>	
	        <img class="img" :src="item.thumb" alt="" />
        	</div>
       </div>
    </div>
    <div class="swiper-pagination"></div>
</div>

<div class="rere">
	<i class="iconfont icon-shehuade"></i>游记攻略
	<span class="more fr">更多 ></span>
</div>
<div class="con">
<nav class="">
	<ul>
		<li @click='selTtem(item)' :class="sel===item?'hl':' '" v-for='(item,index) in nav' :key='index'>{{item}}</li>
	</ul>
</nav>
</div>

    <div class="remen" v-show='show'>
    	<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
    		<li v-for='(iten,index) in hotlist' :key='index'>
		<div class="user">
		<img class="fl tou" src="../../../static/头像.png"/> <!--onerror="this.onerror='';src='2.jpg'"-->
			<p class="u">&nbsp;&nbsp;{{iten.departure_desc}}</p>
    		<p class="shi">&nbsp;&nbsp;&nbsp;&nbsp;{{iten.duration}}个小时前</p>
    	<p class="txt" style="margin-top: 0.3rem;">{{iten.name}}</p>
    	<img class="tu" :src="iten.image"/>
    	</div>	
    	<div class="bb">
    	    <p class="biao">#{{iten.departure_desc}}#</p>
    	    <p class="zan"><!--class="iconfont icon-shoucang"-->
    	    	<i :class='classA' @click='ooo2' :id=index></i>
    	    	<i class="iconfont icon-zan" @click='iten.order_count++'>{{iten.order_count}}</i>
    	    </p>
    	</div>
    		</li>
    	</ul>
    </div>

<div class="fujin" v-show='showw'>
    <div class="fu-list">
    	<ul>
    		<li v-for='(item,index) in fuj' :key='index'>
    			<img :src="item.image"/>
    			<p class="tit">{{item.name}}</p>
    			<span class="span">{{item.tags[0].name}}</span>
    			<span class="span">{{item.tags[1].name}}</span>
    			<div class="cao">
    				<div class="di fl">
    					<i class="iconfont icon-dangdifill"></i>
    					{{item.departure_desc}}
    				</div>
    				<div class="kan fr">
    					<i class="fa fa-eye"></i>
    					{{item.order_count}}
    				</div>
    			</div>
    			
    			
    		</li>
    	</ul>
    </div>
    
</div>
    

		<div style="margin-bottom: 1.35rem;"></div>
	
	<back-top size=''></back-top>  <!--size：有small,big大小-->
	</div>
</template>

<script>
import Footer from '../common/Footer'
import Swiper from 'swiper';
import Vue from 'vue';

import { Toast,InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
	
	export default{
		name:'Found',
		components:{Footer},
		data(){
			return{
				nav:['热门','周边'],
				sel:'热门',
				lun:[],
				hotlist:[],
				page:2,
				count:3,
				fuj:[],
				show:true,
				showw:false,
			    isOk:true, 
                classA:'iconfont icon-shoucang',
                classB:'iconfont icon-shoucangfill'
			}
		},
		methods:{
			loadMore(){
				this.getData();   //到底就循环加载数据
			},
			selTtem(item){
				this.sel=item
				if(item==='周边'){
					this.show=false
					this.showw=true
				}if(item==='热门'){
					this.show=true
					this.showw=false
				}
			},
			ooo2(e){
				console.log(e.target)
				if(e.target.className==this.classB){
	e.target.className= this.classA
				}else if(e.target.className==this.classA){
					e.target.className= this.classB
				}
			
				console.log(e.target.className)
            //this.isOk = !this.isOk
            //isOk?this.style.className='redd':this.className='blue'
//          console.log(this.isOk)
             },
			getlun(){  
				this.$axios.get('/bpi/index/_index.html',{ params:{  }})
			.then((res)=>{
					this.lun=res.data.custom.list[0].products
					console.log(res.data.icon.list)
					Vue.nextTick(()=>{
//			    var mySwiper = new Swiper('.swiper-container',{
//					loop: true,
//				pagination: {
//				    el: '.swiper-pagination',
////				    type: 'bullets',
//				    type: 'fraction',
////				    type : 'progressbar',
//				    //type : 'custom',
//				  },
//				
//				})
				var swiper = new Swiper('.swiper-container', {
					loop: true,
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
			getData(){
				this.toast=Toast({
					  message: 'loading...',
					  iconClass: 'fa fa-circle-o-notch fa-spin fa-lg'
				});//发起请求
				
				this.$axios.get('/aapi/api/homepage/banner/v1.5.0',{ params:{
					page:this.page,
					count:this.count
				}})
				.then((res)=>{
					this.hotlist=this.hotlist.concat(res.data.recommend_products[1].products_info[2])
//					console.log(res.data.recommend_products[1].products_info[2])
				    this.page++
				    this.toast.close();
				})
				.catch((err)=>{
					this.toast.close();
					console.log(err);
				})
			},
			getFu(){ 
				this.$axios.get('/aapi/api/homepage/banner/v1.5.0',{ params:{}})
			.then((res)=>{
					this.fuj=res.data.recommend_products[2].products_info[1]
//					console.log(res.data.recommend_products[2].products_info[1])
				    this.toast.close();
				})
			.catch((err)=>{
				this.toast.close();
					console.log(err)
				})
			}
		},
		mounted(){
			
		},
		created(){
			this.getlun();
			this.getData();
			this.getFu();
		},
		destoyed(){
		}
	}
</script>

<style lang='less' scoped>  /*scoped形成一个作用域*/
@import "../../style/main.less";
@import '../../../node_modules/swiper/dist/css/swiper.css';

.found{
	.toptop{
		width:100%;.h(40);background:#fff;position:fixed;z-index:200;top:0;left:0;
		ul{display: flex;width:100%;height:100%;
			li{
				float: left;
				height: 100%;
				display: flex;
			    justify-content: center;
			    align-items: center;
			}
			.li1{flex: 1;i{.fs(20);}}
			.li2{flex: 4;.fs(16);img{width: 1.7rem; height: .8rem;margin-top: .05rem;}}
			.li3{flex: 1;i{.fs(20);}}
		}
	}
	/*.swiper-pagination{.fs(13);.w(50);.h(17);.left(320);.top(200);background:#0000004f;color:#fff;border-radius:15rem;}*/
    .mengg{position: relative;
    .img{width:100%;.h(220);}
		span{position: absolute;.fs(13);color: #fff;width:100%;height:95%;background:#00000024;
		.zizi{position: absolute;top:40%;left: 30%;text-align: center;}
		}
		}
	.rere{
	.fs(15);.lh(31);font-weight: 550;color:#141414;
	width: 100%;background:#fff;.padding(3,0,5,0);border-bottom:1px dotted #ececec;
	i{.fs(18);float:left;.padding(0,10,0,15);font-weight: 600;color:dodgerblue;}
	.more{.fs(12);font-weight: 500;color:#666;.margin(0,15,0,0);}
}
    .con{width:100%;background: #fff;
    display: flex;text-align: center;
    justify-content: center;
    align-items: center;
    ul{width:100%;
    display: flex;text-align: center;
    justify-content: center;
    align-items: center;
    border-bottom:1px solid deeppink;
    li{width:50%;.fs(16);.h(40);.lh(40);
    border-bottom:2px solid #fff;color:#666;font-weight: 550;
    .padding(0,15,0,15);}
    .hl{color: deeppink;border-bottom: 2px solid deeppink;}
    }
    }
    .remen{width: 100%;background: #fff;
    	li{
    	.padding(5,6,2,5);border-bottom:4px solid #e7e7e7;	
    	.user{width: 100%;
    .tou{.w(50);.h(50);border-radius: 50%;.margin(2,0,0,10);}
    .u{.fs(15);.padding(8,0,0,0);}
    .shi{.fs(12);color: gray;}
    }
    .txt{.fs(13);width:95%;margin: 0 auto;color: #464646;text-indent: 0.5rem;}
    span{.fs(15);}
    .tu{width: 35%;.margin(5,0,3,15);.padding(1,1,1,1);border-radius:0.03rem ;border: 1px solid #ececec;}
    	
    }
    .bb{.h(20);.margin(0,0,15,0);
    	.biao{display: inline-block;background: #ececec;float: left;color: #666;.fs(13);
    	.padding(2,5,2,5);border-radius:0.2rem ;.margin(0,0,0,10)}
    	.zan{display: inline-block;float: right;.margin(-23,0,0,0);}
    	i{.margin(0,8,0,8);}
    	.icon-shoucang{.fs(15);color: blueviolet;}
    	.icon-zan{.fs(14);color: deeppink;}
    	}
    }
    .icon-qita{transform: rotate(360deg)!important;transition: All 0.4s ease-in-out;}
    
    .fujin{
    	width: 100%;background: #fff;height: 26rem;
    	.fu-list{
    			li{
    				.w(170);.h(220);border: 1px solid #dbdbdb;float: left;
    				.margin(10,0,5,12);
    				img{width: 100%;.h(130);}
    				.tit{.fs(14);.w(165);.h(17);overflow: hidden;margin: 0 auto;color: #454545;}
    				.span{.fs(11);border:1px solid #ededed;float: left;color: #8d8d8d;.padding(1,2,1,2);.margin(5,0,3,8)}
    			.cao{width: 90%;.h(20);float: left;.margin(8,0,5,8);
    			.di{
    				.fs(12);color:#515151;
    				i{float: left;color:#000;.padding(0,1,0,0);}
    			}
    			.kan{
    				.fs(12);color:#8d8d8d;
    				i{float: left;.fs(14);color:#b7b7b7;.padding(2,5,1,3);}
    			}
    			}
    			}
    	}
    }
}
</style>