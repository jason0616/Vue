<template>
	<div class="banner">
		<div class="swiper-container">
	    <!-- Additional required wrapper -->
	    <div class="swiper-wrapper">
	        <!-- Slides -->
	        <div class="swiper-slide" v-for='(item,index) in list' :key='index'>
	        <img class="tu" :src="item.picture" alt="" />
	        </div>
	       
	    </div>
	    <!-- If we need pagination -->
	     <div class="swiper-pagination"></div> 
		
	    <!-- If we need scrollbar -->
	    <!--<div class="swiper-scrollbar"></div>-->
	</div>
	</div>
</template>

<script>
import Swiper from 'swiper';
import Vue from 'vue'
	export default{
		name:'Banner',
		components:{},
		data(){
			return{
				name:'banner',
				list:[]
			}
		},
		methods:{
			getBanner(){
//				console.log(this);
				this.$axios.get('/aapi/api/homepage/banner/v1.5.0',{ params:{ }})
			.then((res)=>{
					this.list=res.data.link
//					console.log(res.data.link)
					Vue.nextTick(()=>{
						var mySwiper = new Swiper('.swiper-container', {
							loop: true,   //切回第一页
							pagination: {
						      el: '.swiper-pagination',
						    },
							autoplay: {
								disableOnInteraction: false,  //false: 触碰后自动切换也不会停止
							    delay: 2000,  //2秒切换一次
							  },
						});	
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
			this.getBanner()
		},
		destoyed(){
//			this.mySwiper=null;
            delete this.mySwiper;   //es6
		}
	}
</script>

<style lang='less' scoped>  /*scoped形成一个作用域*/
@import "../../style/main.less";
@import '../../../node_modules/swiper/dist/css/swiper.css';
.banner{z-index:1;.h(220);
.tu{.w(375);.h(220);}
}
</style>