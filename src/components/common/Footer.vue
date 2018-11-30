<template>
	<footer class="footer">
		<ul>
		<router-link  to="/Home">
				<!--<li><i class="iconfont icon-shizhong"></i><span>度周末</span></li>-->
				<li>
				<svg class="icon" aria-hidden="true">
				  <use xlink:href="#icon-qinzilvyou"></use>
				</svg>
				<span>度周末</span>
				</li>
				</router-link >

				<router-link  to="/destination">

				<!--<li><i class="iconfont icon-hangcheng"></i><span>目的地</span></li>-->
				<li>
				<svg class="icon" aria-hidden="true">
				  <use xlink:href="#icon-destport"></use>
				</svg>
				<span>目的地</span>
				</li>
					</router-link >

		
				 <router-link  to="/found">
				<!--<li><i class="iconfont icon-faxian"></i><span>发现</span></li>-->
				<li>
				<svg class="icon" aria-hidden="true">
				  <use xlink:href="#icon-faxian1"></use>
				</svg>
				<span>发现</span>
				</li>
			</router-link>
		
				 <router-link    to="/My">
					 	<!-- <div class='toolbar-title' >卖座电影</div> -->
					 
				<!--<li><i class="iconfont icon-wode2"></i><span>我的</span></li>-->
				<li>
				<svg class="icon" aria-hidden="true">
				  <use xlink:href="#icon-wode1"></use>
				</svg>
				<span>我的</span>
				</li>
			</router-link>
		</ul>
	</footer>
</template>

<script>
	export default{
		name:'Footer',
		components:{},
		data(){
			return{
				name:'footer'
			}
		}
	}

</script>

<style lang='less' scoped>  /*scoped形成一个作用域*/
@import "../../style/main.less";
.footer{z-index:100;
right:0;left:-0;
   position: fixed;bottom: 0;background:#fff;
   width: 100%;border-top:1px solid #c0c0c0;.h(48);
   ul{display: flex;flex-wrap: wrap;height:100%;
	a{
		display:inline-block;width: 25%;height:100%;
		li{ display: flex;
		    flex-direction: column;
		    text-align: center;
		    justify-content: center;
		    align-items: center;
		    width: 100%;height:100%;
		    .fs(10);.lh(18);
		    i{.fs(22);color:gray;}
		    span{color:#7f7f7f;}
		}
	}
	}
}
</style>

