<template>
    <div class="cart">

        <div class='cart-top'><i class="iconfont icon-xitongfanhui1" @click='backto'></i><span class='top-car'>购物车</span><span></span></div>
        <ul class="ulbox">
            <li v-for='(item,index) in data' :key='index' id='item.data.info.product_price_display.product_id'>
        	<input type="checkbox" v-model="checked" @click="check(index,$event)" :value='item.data.info.product_price_display.product_id'>
            <div class="box-right">
                <div class="box-top">    <!--商品图片-->
                    <img class="goodsimg" :src="item.data.base.image_url"/>
                    <div class="title">    <!--商品标题-->
                    	<!--悉尼精华景点自选套票(情人港水族馆/悉尼塔/蜡像馆/野生动物园)-->{{item.data.info.name}}
                    </div>
                    <span class="gotime">
                    	<i class="iconfont icon-feiji"></i>
                    	{{item.time}}
                    </span>
                    <span class="delete">
                    	<a  @click="deleteOne(index)"><i class="iconfont icon-shanchu"></i></a>
                    </span>
                </div>
                <div class="box-bottom">￥{{item.data.info.product_price_display.double_cny}}</div>
            </div>
            </li>
        </ul>
        <div class="foott"></div>
        <div class="footer-bar">
        	<ul>
        		<li>
        		<input type="checkbox" name="" id="" value="" @click='checkAll' v-model='checkall'/>
        		<span >全选</span>
        		</li>
        		<li>
        			合计：<span>0.00元</span>
        		</li>
        		<li><a href="##">立即订购</a></li>
        	</ul>
        </div>
    </div>
</template>

<script>
export default {
    inject:['hidden','reload'],
    data(){
        return{
            list:[],
            data:[],
            checkall:false,
            checked:[],
            checkboxList:[],
            price:[],
            total:'',
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
    //   watch: { //深度 watcher
    //     checkboxList: {
    //         handler: function (val, oldVal) { 
    //             if (this.checkboxList.length === this.checkboxData.length) {
    //                 this.checked=true;
    //             } else {
    //                 this.checked=false;
    //             }
    //         },
    //         deep: true
    //     }
    // },

    methods:{
        checkAll(){
            if(this.checkall){
                this.checked  = [];
               // console.log(this.checked)
            }else { //实现全选
                this.checkboxList = [];
                this.data.forEach( (item) => {
                   // console.log(item.data.info.product_price_display.product_id)
                    this.data.push(item.data.info.product_price_display.product_id);
                });
            }
           
     
            if(this.data.length===this.checked.length){
                this.checkall=true;
            }
            console.log(this.data.length)
            console.log(this.checked.length)
            // console.log(this.checked)
            // this.checkboxList=!this.checkboxList;
            //console.log(this.checked)
        },
        check(index,e){
            if(this.data.length===this.checkboxList.length){
                this.checkall=true;
            }
            console.log(e.target.checked)
            if(e.target.checked){
            this.checkboxList.push(index)
          
                // this.data.forEach( (item) => {
                //    // console.log(item.data.info.product_price_display.product_id)
                //   //  this.price.push(item.data);
                // });

            }else{
                this.checkboxList.splice(index,1)
            }
         if(this.data.length===this.checkboxList.length){
                this.checkall=true;
            }else{
                this.checkall=false
                console.log(333)
            }
   console.log(this.checked.length)
        },
        backto(){
            this.$router.back(-1)
        },
        deleteOne:function(index){
           this.data.splice(index,1);
            var s=this.list.split(',')
            s.splice(index,1)
            console.log(s)
            window.localStorage.setItem('cart',s)
            console.log(this.list)
           // this.reload()
           },
        getCart(list){
            if(list){
            var s=list.split(',')
           // var r=s.split('&')
           var arr1=[]
           var arr2=[]
           for(let i=0;i<s.length;i++){
               arr1.push(s[i].split('&')[0])
               arr2.push(s[i].split('&')[1])
               let index=i
               this.$axios
        .get(`https://app.toursforfun.com/api/product/${s[i].split('&')[0]}`, {
          params: {}
        }).then((res)=>{
           // console.log(res)
            res.time=s[index].split('&')[1]
            console.log(res)
            this.data=this.data.concat(res)
            console.log(this.data)
        })

        
           }
            console.log(arr1)
            console.log(arr2)
            //console.log(r)
    }   else{
        console.log('购物车没东西')
    }
        }
    },
name:'cart',
created(){
    this.hidden(false)
    console.log(this.$route.params.good)
    this.list=window.localStorage.getItem('cart')
    
    console.log(this.list)
    this.getCart(this.list)

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
            	.delete{.margin(0,0,0,68);i{color:#FF5400;}}
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
