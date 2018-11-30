<template>
	<div class="list">
		<header>
		<div class="toptop">
            <div @click="back" class="back"> 
				<router-link tag='i' to='/Home' class="iconfont icon-xitongfanhui1 fl" ></router-link>
           
            </div>
            <div class="t fl">
            	<span>周末出游</span>
            </div>
		</div>
		<div class="top">
			<ul>
				<li>
					<a @click='go'>热门</a>
				</li>
				<li>
					<a>价格 <i class="fa fa-sort"></i></a>
				</li>
				<li>
					<a>类型</a>
				</li>
			</ul>
		</div>
		</header>
		<main>
			<div class="choose">
		<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
			<li v-for='(item,index) in plist' :key='index' @click='go' :id='item.id_new' :id_new='item.id'>
			<img class="jing" :src="item.image"/>
			<span class="ju">	{{item.name.split('-')[2]?item.name.split('-')[2]+'出发':"热门"}}</span>
			<!-- ${{(item.origin_price-199).toFixed(0)}} -->
			<span class="jia">¥{{(item.origin_price*6.8).toFixed(0)}}<span class='old'></span>&nbsp;</span>
			<p class="desc"><{{item.name.split('-')[2]?item.name.split('-')[2]:"热门"}}></p>
			<div class="info">
				{{item.name}}
			</div>
			<span class="aa fl">今日可订</span><span class="bb fl">优惠券</span>
			<span class="shou fr"> {{item.order_count}}人出游</span>
			</li>
		</ul>
		<div style="margin-bottom: 1.5rem;"></div>
			</div>
		</main>
		<back-top size=''></back-top>
	</div>
</template>

<script>
import { Toast,InfiniteScroll } from 'mint-ui';
import Vue from 'vue';
import { setTimeout } from 'timers';
Vue.use(InfiniteScroll);
export default {
  name: "List",
  components: {},
  data() {
    return {
      name: "我是list",
	  plist: [],
	  page:1,
	  busy:false,
	  word:''
    };
  },
  methods: {
    back() {},
    go(e) {
	
    if(e.target.parentNode.nodeName=='LI'){
          console.log(e.target.parentNode.id)
          let id=e.target.parentNode.id
      //this.$router.push({ name: 'Goods', params: { newId: id }})
  this.$router.push({ path: 'goods', query: { newId: id }})
      
      }else{
           console.log(e.target.id)
               let id=e.target.id
       // this.$router.push({ name: 'Goods', params: { newId: id }})
     this.$router.push({ path: 'goods', query: { newId: id }})
      }
    },
    href() {
      //  this.$router.push({ path: `${path}`, params: { userId: 123 }})
	},
	loadMore(){
		
		



      this.busy = true
      //把busy置位true，这次请求结束前不再执行
      setTimeout(() => {
        this.page++
       	 this.axios(this.$route.params.userId);
        //调用获取数据接口，并且传入一个true，让axios方法指导是否需要拼接数组。
      }, 100)
   

	},
    axios(word) {
      
    console.log(word)
    if(word==undefined){
      word= window.localStorage.getItem('listword')
    }
		this.toast=Toast({
					  message: 'loading...',
					  iconClass: 'fa fa-circle-o-notch fa-spin fa-lg'
				});
				this.word=word
      this.$axios.get(
		  
		  `https://app.toursforfun.com/api/search/category`,
		 //https://app.toursforfun.com/api/search/category%20?customCurrency=USD&keyword=%E5%B9%BF%E5%B7%9E&page=1&pageSize=10&product_line=
		 // https://app.toursforfun.com/api/search/category?customCurrency=USD&keyword=%E5%8C%97%E4%BA%AC&page=2&pageSize=10&product_line=
          {
			  
            params: {
				customCurrency:'CNY',
				 keyword:this.word,
				 page:this.page,
				 pageSize:9,
				 product_line:''
			}
          }
        )
        .then(res => {
          if (res.data.product_list != 0) {
			
            console.log(res);
            //this.city=this.val+'的旅游产品'
            console.log(res.data.product_list);
            //console.log(res.data.product_list[0].name)
            //this.toast.close();
            this.plist = this.plist.concat(res.data.product_list);
			console.log()
            // this.total=res.data.total_count
            //   this.$nextTick(()=>{
            //     setTimeout(()=>{
            // //this.tshow=true
            //     },10)

            //   })
				this.toast.close();
				this.busy = false
            console.log(this.plist);
          } else {
			  this.toast.close();
			 let toast = Toast('没有更多啦');
			  console.log('到底啦')
            //this.city = "没有找到相关产品!";
			this.total = 0;
			setTimeout(()=>{
			this.toast.close();
			},500)
			
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // console.log(this.$route.params.userId);
    if (this.$route.params.userId) {
      this.axios(this.$route.params.userId);
      window.localStorage.setItem('listword',this.$route.params.userId)
        console.log('localStorage'+window.localStorage.getItem('listword'))
    } else {
          this.axios(this.$route.params.userId);
          window.localStorage.getItem('listword')
               console.log('localStorage 2'+window.localStorage.getItem('listword'))
      this.axios("广州");
    }
  }
};
</script>

<style lang='less' scoped>
/*scoped形成一个作用域*/
@import "../../style/main.less";
.list {
  background: #fff;
  header {
    .toptop {
      .h(35);
      display: flex;
      border-bottom: 1px solid #b2b2b2;
      .back {
        flex: 1;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
      }
      .t {
        flex: 10;
        .fs(16);
        text-align: center;
        .lh(35);
        span {
          margin-right: 0.58rem;
          color: #434343;
        }
      }
    }
    .top {
      .h(35);
      display: flex;
      ul {
        width: 100%;
        height: 100%;
        li {
          flex: 1;
          .fs(15);
          float: left;
          width: 33%;
          height: 100%;
          display: flex;
          text-align: center;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
.choose {
  width: 100%;
  li {
    .h(295);
    .margin(0, 0, 5, 0);
    background: #fff;
    width: 100%;
    position: relative;
    img {
      width: 99%;
      .h(190);
      border: 2px solid #fff;
      float: left;
    }
    .ju {
      position: absolute;
      .top(168);
      .left(2);
      .padding(3, 3, 3, 3);
      background: #00000040;
      border-top-left-radius: 0.1rem;
      border-top-right-radius: 0.1rem;
      .fs(12);
      color: #fff;
    }
    .jia {
      position: absolute;
      .top(160);
      .right(2);
      .padding(0, 8, 0, 10);
      .fs(23);
      color: #fff;
      background: linear-gradient(#000000a8, transparent);
      border-top-left-radius: 0.15rem;
      border-top-right-radius: 0.15rem;
      .old {
        .fs(15);
        text-decoration: line-through;
        color: gray;
      }
    }

    .desc {
      .fs(13);
      color: #673ab7;
      float: left;
      .padding(2, 5, 0, 10);
      font-weight: 550;
    }
    .info {
      width: 90%;
      .h(37);
      .fs(14);
      .margin(3, 0, 0, 25);
      text-indent: 0.5rem;
      overflow: hidden;
      float: left;
      display: block;
    }
    .aa {
      .fs(12);
      background: #ffc107;
      .padding(3, 4, 3, 4);
      border-radius: 0.1rem;
      color: white;
      .margin(8, 0, 0, 15);
    }
    .bb {
      .fs(12);
      background: #fc6a77;
      .padding(3, 4, 3, 4);
      border-radius: 0.1rem;
      color: white;
      .margin(8, 0, 0, 10);
    }
    .shou {
      .fs(13);
      color: #898989;
      .margin(10, 15, 0, 0);
    }
  }
}
</style>