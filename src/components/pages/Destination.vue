<template>
	<div class="destination">
		<div class="des-main">
			<a class="inputout" @click="showinput">
                <i class="iconfont icon-sousuo"></i>
                <span>搜索目的地/景点/关键词</span>
            </a>
		</div>
<!------左边选框-->
		<div class="des-left">
			<div class="left-dir">
				<ul>
				<li class="adrbtn"  @click='selItem(item)' :class="sel===item?'xuan':' '" v-for="(item,index) in scope" :key='index'>{{item}}
				<em class="" @click='selItem(item)' :class="sel===item?'sanjiao':' '"></em>
				<img class="imgno" @click='selItem(item)' :class="sel===item?'adrbgimg':' '" src="../../../static/image/mu2.jpg">
				</li>
				</ul>
			</div>
		</div>
<!------右边城市-->
        <div class="des-right">
    <!------------热门-->
        	<div class="hot-city" v-show='showremen'>
        		<div class="re">
        			<i class="iconfont icon-renqi1"></i>
        			热门国家
        		</div>
        		<div class="city">
        			<ul>
        				<li class="city-li" v-for='(item,index) in city' :key='index'>
        					<img class="cheng" :src="item.image"/>
        					<span class="name">{{item.title}}</span>
        				</li>
        			</ul>
        		</div>
        		<div class="wan">
        			<svg class="icon ii" aria-hidden="true">
					  <use xlink:href="#icon-hangcheng"></use>
					</svg>主题乐园
        		</div>
        		<div class="le">
        			<img :src="city1"/>
    			<p class="pp">迪士尼门票</p>
        		</div>
        		<div class="diqu">
        			<svg class="icon" aria-hidden="true">
					  <use xlink:href="#icon-mudedi"></use>
					</svg>地区
        		</div>
        		<div class="di">
        			<span class="didi" v-for='(item,index) in city2' :key='index'><a href="##">{{item}}</a></span>
        		</div>
        	</div>
    <!--------------华南-->    	
    <div class="hot-city" v-show='shownan'>
		<div class="re">
			<i class="iconfont icon-renqi1"></i>
			热门国家
		</div>
		<div class="city">
			<ul>
				<li class="city-li" v-for='(iten,index) in nan' :key='index'>
					<img class="cheng" :src="iten.image"/>
					<span class="name">{{iten.departure_desc}}</span>
				</li>
			</ul>
		</div>
    		<div class="wan">
    			<i class="iconfont ii icon-wan" style="font-size:0.42rem ;color:orangered;margin-left: 0.2rem;"></i>
    			吃喝玩乐
    		</div>
    		<div class="le">
    			<img :src="nan1"/>
    			<p class="pp">悉尼观光巴士</p>
    		</div>
		<div class="diqu">
			<svg class="icon" aria-hidden="true">
			  <use xlink:href="#icon-mudedi"></use>
			</svg>地区
		</div>
		<div class="di">
			<span class="didi" v-for='(iten,index) in diqu' :key='index'><a href="##">{{iten}}</a></span>
		</div>
	</div>
	<!--------------华东-->    	
    <div class="hot-city" v-show='showdong'>
		<div class="re">
			<i class="iconfont icon-renqi1"></i>
			热门国家
		</div>
		<div class="city">
			<ul>
				<li class="city-li" v-for='(iten,index) in dong' :key='index'>
					<img class="cheng" :src="iten.image"/>
					<span class="name">{{iten.departure_desc}}</span>
				</li>
			</ul>
		</div>
		<div class="diqu">
			<svg class="icon" aria-hidden="true">
			  <use xlink:href="#icon-mudedi"></use>
			</svg>地区
		</div>
		<div class="di">
			<span class="didi" v-for='(iten,index) in dong1' :key='index'><a href="##">{{iten}}</a></span>
		</div>
	</div>
	<!--------------华北-->    	
    <div class="hot-city" v-show='showbei'>
		<div class="re">
			<i class="iconfont icon-renqi1"></i>
			热门国家
		</div>
		<div class="city">
			<ul>
				<li class="city-li" v-for='(iten,index) in bei' :key='index'>
					<img class="cheng" :src="iten.image"/>
					<span class="name">{{iten.departure_desc}}</span>
				</li>
			</ul>
		</div>
		<div class="diqu">
			<svg class="icon" aria-hidden="true">
			  <use xlink:href="#icon-mudedi"></use>
			</svg>地区
		</div>
		<div class="di">
			<span class="didi" v-for='(iten,index) in bei1' :key='index'><a href="##">{{iten}}</a></span>
		</div>
	</div>
	<!--------------华中-->    	
    <div class="hot-city" v-show='showzhong'>
		<div class="re">
			<i class="iconfont icon-renqi1"></i>
			热门国家
		</div>
		<div class="city">
			<ul>
				<li class="city-li" v-for='(iten,index) in zhong' :key='index'>
					<img class="cheng" :src="iten.image"/>
					<span class="name">{{iten.departure_desc}}</span>
				</li>
			</ul>
		</div>
		<div class="diqu">
			<svg class="icon" aria-hidden="true">
			  <use xlink:href="#icon-mudedi"></use>
			</svg>地区
		</div>
		<div class="di">
			<span class="didi" v-for='(iten,index) in zhong1' :key='index'><a href="##">{{iten}}</a></span>
		</div>
	</div>
        	
        	
    
        </div>
        	<transition 
		  enter-active-class='animated slideInLeft'
		  leave-active-class='animated slideOutLeft'
        >
		
        <showInput v-show="showsearch"></showInput>
        	</transition>
	</div>
</template>

<script>
import showInput from '../common/Search'
	export default{
		name:'destination',
		components:{showInput},
		data(){
			return{
				scope:['热门','华南','华东','华北','华中'],
				sel:'热门',
				city:[],city1:[],city2:[],
				diqu:[],
				nan:[],nan1:[],
				dong:[],dong1:[],
				bei:[],bei1:[],
				zhong:[],zhong1:[],
				showremen:true,
				shownan:false,
				showdong:false,
				showbei:false,
                showzhong:false,
                showsearch:false,
			}
		},
		methods:{
            showinput(){
                this.showsearch=true
            },
			selItem(item){
				this.sel=item
				if(item==='热门'){
					this.showremen=true
					this.shownan=false
					this.showdong=false
					this.showbei=false
					this.showzhong=false
				}if(item==='华南'){
					this.showremen=false
					this.shownan=true
					this.showdong=false
					this.showbei=false
					this.showzhong=false
				}if(item==='华东'){
					this.showremen=false
					this.shownan=false
					this.showdong=true
					this.showbei=false
					this.showzhong=false
				}if(item==='华北'){
					this.showremen=false
					this.shownan=false
					this.showdong=false
					this.showbei=true
					this.showzhong=false
				}if(item==='华中'){
					this.showremen=false
					this.shownan=false
					this.showdong=false
					this.showbei=false
					this.showzhong=true
				}
			},
			getRemen(){  
				this.$axios.get('/aapi/api/homepage/banner/v1.5.0',{ params:{ }})
			.then((res)=>{
					this.city=res.data.hot_destination
					this.city1=res.data.recommend_products[3].products_info[1][3].image
					this.city2=res.data.recommend_products[3].products_info[1][5].city_name
				})
			.catch((err)=>{
					console.log(err)
				})
			},
			getDiqu(){  
				this.$axios.get('/aapi/api/homepage/banner/v1.5.0',{ params:{ }})
			.then((res)=>{
					this.diqu=res.data.recommend_products[0].region
				})
			.catch((err)=>{
					console.log(err)
				})
			},
			getNan(){  
				this.$axios.get('/aapi/api/homepage/banner/v1.5.0',{ params:{ }})
			.then((res)=>{
					this.nan=res.data.recommend_products[3].products_info[2]
					this.nan1=res.data.recommend_products[3].products_info[0][3].image
				})
			.catch((err)=>{
					console.log(err)
				})
			},
			getDong(){  
				this.$axios.get('/aapi/api/homepage/banner/v1.5.0',{ params:{ }})
			.then((res)=>{
					this.dong=res.data.recommend_products[0].products_info[2]
					this.dong1=res.data.recommend_products[0].products_info[2][0].city_name
//					console.log(res.data.recommend_products[0].products_info[2][0].city_name)
				})
			.catch((err)=>{
					console.log(err)
				})
			},
			getBei(){  
				this.$axios.get('/aapi/api/homepage/banner/v1.5.0',{ params:{ }})
			.then((res)=>{
					this.bei=res.data.recommend_products[0].products_info[3]
					this.bei1=res.data.recommend_products[0].products_info[2][1].city_name
//					console.log(res.data.recommend_products[0].products_info[3])
				})
			.catch((err)=>{
					console.log(err)
				})
			},
			getZhong(){  
				this.$axios.get('/aapi/api/homepage/banner/v1.5.0',{ params:{ }})
			.then((res)=>{
					this.zhong=res.data.recommend_products[3].products_info[3]
					this.zhong1=res.data.recommend_products[3].products_info[1][0].city_name
				})
			.catch((err)=>{
					console.log(err)
				})
			},
		},
		mounted(){
			
		},
		created(){
			this.getRemen();
			this.getDiqu();
			this.getNan();
			this.getDong();
			this.getBei();
			this.getZhong();
		},
		destoyed(){
		}
	}
</script>

<style lang='less' scoped>  /*scoped形成一个作用域*/
@import "../../style/main.less";
.destination{background:#f7f7f7;
	.des-main{
		width: 100%;.h(110);
	    background-image: url(../../../static/image/mu1.jpg);
	    background-size: 100% 100%;
	    overflow: hidden;background-repeat: no-repeat;
	    position: fixed; z-index:999;
	    .inputout{
	    	display: block;
		    width: 80%;height: 0.75rem;
		    background-color: #fff;
		    border-radius: 0.7rem;
		    margin: 1.8rem auto 0;
		    overflow: hidden;text-align: center;
		    line-height: 0.75rem;color: #999;.fs(13);
		    box-shadow: 0 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.15);
		    i{.fs(14);}
	    }
	}
	    .des-left{
	    	    float: left;    -webkit-overflow-scrolling: touch;
			    width: 29%;.h(400);
    			overflow-y: hidden;overflow-x: hidden;
			    .margin(110,0,0,0);
	    .left-dir{
    	    padding-bottom: 1rem;
		    overflow: hidden;position: fixed; 
		    ul{height: 100%;
			    padding-bottom: 0.02rem;
			    overflow-y: scroll;
			    overflow-x: hidden;
			    .adrbtn{
			    	    width: 3rem;.h(50);.lh(50);
					    text-align: center;.fs(14);
					    background-color: #f7f7f7;color: #666;
					    position: relative;border:0.5px solid #e7e7e7;
					.sanjiao{
					    display: block;
					    .w(13);.h(10);
					    background-image: url(../../../static/image/jiant.png);
					    background-size: 100% 100%;
					    position: absolute;
					    background-repeat: no-repeat;
					    .top(21);.right(-5);
					    z-index: 99;
					}
					.imgno{display: none;}
					.adrbgimg{
						.w(48);.h(50);
						display: block;position: absolute;
						.top(-5);.right(-10);
					}
			    }
			    .xuan{
		    	    border: none;background-color: #fff;
				    display: block;z-index: 99;
				    text-align: center;
				    color: #dd255b;.fs(16);
				    vertical-align: middle;overflow: hidden;
				    box-shadow: 0.1rem 0 0.13rem 0.1rem rgba(0, 0, 0, 0.11);
			    }
			    .xuan:before{
				    display: block;
				    content: '';
				    position: absolute;
				    .w(5);height: 100%;
				    left: 0;
				    bottom: 0;
       				background: linear-gradient(#ff8165, #f53f66);
				}
		    }
	    }
	    }
/*------右边*/
.des-right{
    width:68%;height:auto;
    float: right;background: #fff;
    padding-right: 0.2rem;
    overflow-y: scroll;overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    .margin(110,0,50,0);z-index: 10;
	.hot-city{
		.re{.padding(18,0,10,10);.fs(15);
			i{.fs(18);.padding(0,10,0,5);color: red;}
		}
		.city{width: 100%;height: auto;float: left;
		ul{height: auto;
			.margin(5,0,0,7);
			.city-li{
				float: left;.margin(0,0,5,13);position: relative;
				.cheng{.w(105);.h(75);.border-radius(4,4,4,4);}
				.name{position: absolute;.fs(12);left: 0;.bottom(8);background: #00000070;
    				width: 100%;text-align: center;color: #fff;.lh(20);.border-radius(0,0,4,4);}
			}
		}
		}
		.diqu{.fs(15); .margin(10,0,0,0);float: left;
			.icon{.fs(12);.padding(0,10,0,10);}width:100%;
		}
		.di{.margin(10,0,30,2);height: auto;float: left;
			.didi{float: left;text-align: center;.margin(5,5,5,12);
				.fs(13);border: 1px solid #eaeaea;.padding(4,8,4,8);.border-radius(4,4,4,4);
				a{color: #666;display: inline-block;width: 100%;height: 100%;}
			}
		}
		.wan{.fs(15); .margin(20,0,0,0);float: left;
			.ii{.fs(10);.padding(0,10,0,10);};width:100%;
		}
		.le{float: left;.margin(10,0,0,60);
			img{.w(140);border: 1px solid #ccc;.padding(1,1,1,1);}
			.pp{.fs(13);text-align: center;color: #e72760;}
		}
	}
}
	
}
</style>