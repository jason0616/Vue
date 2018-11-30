<template>
    <div class="cart">

        <div class='cart-top'><i class="iconfont icon-xitongfanhui1"></i><span class='top-car'>购物车</span><span></span></div>
        <ul class="ulbox">
            <li v-for='(item,index) in cartList'>
        	<input type="checkbox">
            <div class="box-right">
                <div class="box-top">    <!--商品图片-->
                    <img class="goodsimg" src="../../../../img/toux.png"/>
                    <div class="title">    <!--商品标题-->
                    	<!--悉尼精华景点自选套票(情人港水族馆/悉尼塔/蜡像馆/野生动物园)-->{{item.title}}
                    </div>
                    <span class="gotime">
                    	<i class="iconfont icon-feiji"></i>
                    	1234-12-12 出发
                    </span>
                    <span class="delete">
                    	<a href="##" @click="deleteOne(index)"><i class="iconfont icon-shanchu"></i></a>
                    </span>
                </div>
                <div class="box-bottom"> $ 1234元</div>
            </div>
            </li>
        </ul>
        <div class="footer-bar">
        	<ul>
        		<li>
        		<input type="checkbox" name="" id="" value="" />
        		<span>全选</span>
        		</li>
        		<li>
        			合计：<span>11111元</span>
        		</li>
        		<li><a href="##">立即订购</a></li>
        	</ul>
        </div>
    </div>
</template>
<!--list:replace(list[i],'')-->
<script>
export default {
    inject:['hidden'],
    name:'cart',
    data(){
    	return {
    		cartList:[
    		{
    			title:'1111',gotime:'1212'
    			},
    		{
    			title:'1122',gotime:'1112'
    			}
    		],
    		select:false,
    	}
    },
    methods:{
		deleteOne:function(index){
   		this.cartList.splice(index,1);
   },
    },
created(){
    this.hidden(false);
},
destroyed(){
    this.hidden(true)
}

}
</script>

<style lang='less' scoped>
@import "../../style/main.less";

.cart{
    display: flex;
    flex-direction: column;
    .ulbox{
        .padding(5,20,0,15);
        .box-right{
            display: flex;
            .w(300);.margin(10,0,0,15);
            flex-direction: column;
            border-bottom: 1px solid #ccc;
            .box-top{
            	.goodsimg{.w(75);.h(75);background:#fff;.padding(1,1,1,1);border:1px solid #ccc;float:left;}
            	.title{float:right;.w(210);.h(40);.fs(15);overflow: hidden;}
            	.gotime{.fs(14);.margin(20,0,0,10);display: inline-block;}
            	.delete{.margin(0,0,0,35);i{color:#FF5400;}}
            }
            .box-bottom{color: #FF5400;font-weight: bolder;.padding(10,0,5,10);}
        }
        li{
            display: flex;
            justify-content: space-around;
            align-items: center;
            .fs(18);
            input{.w(17);.h(17);background:#329ef1;}
        }
    }
    .cart-top{
        .h(43); .padding(0,20,0,18);

        box-shadow: 0 1px 2px rgba(88,88,88,.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon-xitongfanhui1{.fs(20);font-weight:600;}
        .top-car{
            .fs(18);font-weight:550;

        }
    }
    .footer-bar{width:100%;.h(60);position: fixed;bottom:0;background:#fff;
        box-shadow: 0 -3px 11px rgba(0,0,0,.1);
        ul{
        	display:flex;
        	li:nth-child(1){input{.margin(-10,0,0,0);.w(17);.h(17);background:#329ef1;}
        		flex:1;.fs(16);.lh(60);.padding(0,0,0,10);}
        	li:nth-child(2){.fs(16);.lh(60);font-weight:600;flex:2;
        	span{    color: #FF5750;}}
        	li:nth-child(3){a{display: inline-block;width: 100%;height: 100%;color: #fff;}
        		background: linear-gradient(30deg,#ff745a,#ff1a62);.fs(19);font-weight:600;flex:2;.lh(60);text-align: center;}
        }
        }
}
</style>
