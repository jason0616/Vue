<template>
	<div class="choose">
		<ul>
			<li v-for='(item,index) in goods' :key='index'>
			<img class="jing" :src="item.image"/>
			<span class="ju">距您 {{item.default_price}} 公里</span>
			<span class="jia">￥{{item.origin_price}}<span class='old'>￥{{item.origin_price}}</span></span>
			<p class="desc">< {{item.departure_desc}} ></p>
			<div class="info">
				{{item.name}}
			</div>
			<span class="aa fl">今日可订</span><span class="bb fl">优惠券</span>
			<span class="shou fr">已售  {{item.duration}}</span>
			</li>
		</ul>
		<div style="margin-bottom: 1.5rem;"></div>
	</div>
</template>

<script>
	export default{
		name:'Choose',
		components:{},
		data(){
			return{
				name:'choose',
				goods:[]
			}
		},
		methods:{
			getData(){
				this.$axios.get('/aapi/api/homepage/banner/v1.5.0',{ params:{ }})
			.then((res)=>{
					this.goods=res.data.recommend_products[0].products_info[0]
//					console.log(res.data.recommend_products[0].products_info[0])
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
		},
	}
</script>

<style lang='less' scoped>  /*scoped形成一个作用域*/
@import "../../style/main.less";
.choose{
width: 100%;
li{.h(295);.margin(0,0,5,0);background:#fff;width:100%;position: relative;
img{width: 99%;.h(190);border:2px solid #fff;float: left;}
.ju{position: absolute;.top(168);.left(2);.padding(3,3,3,3);background:#00000040;border-top-left-radius: 0.1rem;border-top-right-radius: 0.1rem;
    .fs(12);color:#fff;}
.jia{position: absolute;.top(160);.right(2);.padding(0,8,0,10);.fs(23);color:#fff;
background: linear-gradient(#000000a8,transparent);border-top-left-radius: 0.15rem;border-top-right-radius: 0.15rem;
.old{.fs(15);text-decoration: line-through;color:gray;}}

   .desc{.fs(13);color:#673AB7;float: left;.padding(2,5,0,10);font-weight:550;}
   .info{width: 90%;.h(37);.fs(14);.margin(3,0,0,25);text-indent: 0.5rem;overflow: hidden;float: left;display:block;}
   .aa{.fs(12);background:#ffc107;.padding(3,4,3,4);border-radius:0.1rem;color:white;.margin(8,0,0,15);}
   .bb{.fs(12);background:#fc6a77;.padding(3,4,3,4);border-radius:0.1rem;color:white;.margin(8,0,0,10);}
   .shou{.fs(13);color:#898989;.margin(10,15,0,0);}
}
}
</style>