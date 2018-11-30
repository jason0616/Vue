<template>
	<div class="header">
		<nav id="nav">
			<div class="kong"></div>
			<div class="zuo">
				<span id="place">广州</span>
				<i class="iconfont icon-xiala"></i>
			</div>
			<div class="input" @click='search'>
				<transition  
		  enter-active-class='animated fadeInDown'
		  leave-active-class='animated  fadeOutUp'
        >	

				<search v-show='this.$store.state.show'></search>
				</transition>
				<div class="inp">
					<i class="iconfont icon-sousuo" ></i>
					<input type="text" id="" value="" placeholder="  这个周末想玩点啥" />
				</div>
			</div>
			<div class="you"> 
				<a><i class="iconfont icon-haoping"></i></a>
			</div>
		</nav>
	</div>
</template>

<script>
import search from './Search'
import { setTimeout, clearTimeout } from 'timers';
	export default{
		name:'Header',
		components:{
			search
		},
		data(){
			return{
				name:'我是header',
				timer:null,
				
			}
		},
		methods:{
			search(){
				clearTimeout(this.timer)
				this.$store.commit('changeshow',true)
				
			
			}
		}
	}
</script>

<style lang='less' scoped>  /*scoped形成一个作用域*/
@import "../../style/main.less";
.header{z-index:10;position:absolute;
	#nav{
		display:flex;
		.h(45);
		.w(375);
	.zuo{
		flex: 1;
		height: 100%;
		display: flex;
	    justify-content: center;
	    align-items: center;
	    span{
	    	.fs(15);
	    	color:#fff;
	    	}
	    i{.fs(17);color:#fff;.margin(3,0,0,2);}
	}
	.input{
		flex: 3;
		height: 100%;
		.inp{ 
			background:#0000005c;
			border-radius:15rem;
			.h(30);
			.margin(8,0,0,0);
			display: flex;
		    justify-content: center;
		    align-items: center;
		    input{.fs(14);}
		i{.fs(17);color:#fff;}
		input{width:80%;.h(20);color:#fff;
		background:transparent;border:transparent;}
			}
	}
	.you{
		flex: 0.5;
		height: 100%;
	    a{
	    	width: 100%;height: 100%;
			display: flex;
		    justify-content: center;
		    align-items: center;
	    	i{.fs(17);color:#fff;font-weight: 600;}
	    }
	}
	}
	
}
</style>