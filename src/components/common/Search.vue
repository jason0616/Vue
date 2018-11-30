<template>
<div id='dv'>
  
    <div class="dbox">
   <div class="inpp">
		<i class="iconfont icon-sousuo" ></i>
		<input type="text" id="" v-model='val' value="" placeholder="这个周末想玩点啥"  autofocus  @keyup='find' @keydown.enter='search'/>   
    </div>

        <span @click='cel'>取消</span>
    </div>
    <div id='history' v-show="ser" >
        <div class="searchTop"><span>历史搜索</span> <i class="fa fa-trash-o" aria-hidden="true" @click='del'></i></div>
    <ul class="searchHistory">
       
    <li v-for="(item,index) in newlist" :key='index' @click='serclick'>{{item}}</li>
    </ul>
    </div>
    <div id='success' v-show='suc' >
      <div class='city' v-show='tshow'>{{city}} <span @click='getlist'>查看全部{{total}}个产品</span></div>
      <ul class='ulBox'>
      <li v-for='(ex,index) in plist' :key="index" :id='ex.id_new' :id_new='ex.id' @click="getid"><div class='content'>{{ex.name}}</div><span class='ulSpan'> > </span></li>

      </ul>
    </div>
    </div>
</template>
<script>
import Vue from "vue";
import { Toast, InfiniteScroll } from "mint-ui";
import { setTimeout } from 'timers';
export default {
  inject:['reload'],//注入依赖
  name: "search",
  data() {
    return {
        val:'',
        ser:true,
        tshow:false,
        suc:false,
        city:'',
      total:'',
      list:[],
     plist:[],
      oldlist:[],
      timer:null,
    newlist:'',
    word:''
    };
  },
  methods:{
    //传id到详情页
    sedId(){

    },
    getid(e){
      // if(e)
     
      if(e.target.parentNode.nodeName=='LI'){
          console.log(e.target.parentNode.id)
          let id=e.target.parentNode.id
        this.$router.push({ path: 'goods', query: { newId: id }})
      }else{
           console.log(e.target.id)
               let id=e.target.id
     this.$router.push({ path: 'goods', query: { newId: id }})

      }
    },
     //传id到列表页
    getlist(){
      console.log(this.val)
      let keyword=this.val
      this.$router.push({ name: 'list', params: { userId: keyword }})
    },



      axios(word){
          this.$axios.get(`https://app.toursforfun.com/api/search/keywords?keyword=${word}`,{ params:{ 
        }})
        .then((res)=>{
          if(res.data.product_list!=0){
          console.log(res)
          this.city=this.val+'的旅游产品'
          console.log(res.data.product_list)
           //console.log(res.data.product_list[0].name)
          this.toast.close();
          this.plist=res.data.product_list
          this.total=res.data.total_count
          this.$nextTick(()=>{
            setTimeout(()=>{
        this.tshow=true
            },10)

          })
        
           console.log(this.plist)
           }else{
             this.city='没有找到相关产品!'
             this.total=0;
           }
        })
        .catch((err)=>{
          console.log(err)
        })
      },

      serclick(e){
        this.ser=false      
      this.suc=true
        this.val=e.target.innerHTML
          this.toast=Toast({
					  message: 'loading...',
					  iconClass: 'fa fa-circle-o-notch fa-spin fa-sm'
				});
        this.axios(this.val)
      },
    cel(){

        //this.$store.commit('change')
        this.$store.commit('changeshow',false)
        console.log(this.$store.state.show)

        //console.log(this.$store.state.show)
        console.log(1)
        this.reload()
        
    },
    
      //按下键盘keyup 搜索
    find(){
      //延时搜索

      // /dpi/api/search/keywords?keyword=%E5%B9%BF%E5%B7%9E
      if(this.val!=''){
      this.ser=false 
      this.suc=true
            clearTimeout(this.timer)
              this.toast=Toast({
					  message: 'loading...',
					  iconClass: 'fa fa-circle-o-notch fa-spin fa-sm'
				});
       this.timer=setTimeout(()=>{
         
        this.word=encodeURI(this.val)
        
    // console.log(decodeURI('https://app.toursforfun.com/api/search/keywords?keyword=%E5%B9%BF%E5%B7%9E'))
    //  console.log(word)
    // console.log(decodeURI(word))
      this.axios(this.word)

      },500)
      setTimeout(()=>{
    this.toast.close();
      },300)
     
}else{
  this.ser=true 
  this.suc=false
}
    },
   
      del(){
window.localStorage.removeItem('list')
let instance = Toast("搜索历史清除成功");
      
      setTimeout(() => {
        instance.close();
        this.reload()
      }, 1000);
      },
search(){
if(this.oldlist!=null){
    let a=this.oldlist
    let s=a.split(',')

    this.list.unshift(this.val)

     //console.log(Array.isArray(s) )
  this.list=this.list.concat(s)

     let str=new Set(this.list)
     var arr=Array.from(str)//set 转换为真正的数组
     window.localStorage.setItem('list',arr)//设置新的localStorage
     this.newlist=arr
    }else{
        this.list.push(this.val)
        window.localStorage.setItem('list',this.list)
        this.ser=false;
    }
}
  },
 
  mounted() {
      this.oldlist=window.localStorage.getItem('list')
    this.$store.commit("Fshowchange", false);
    if(this.oldlist!=null){
  var str=(window.localStorage.getItem('list')).split(',')
    //console.log("str:"+str)
  this.newlist=str
    }else{
        this.ser=false;
    }
  },
  
  created() {
    //console.log(this.$store.state.show)
    
  },
  destroyed() {
    this.cel()
  },
};
</script>
<style lang='less' scoped>
@import "../../style/main.less";
#dv {
  display: white;
  position: fixed;
  z-index: 9999999;
  display: flex;
  .padding(0,18,0,18);
//   justify-content: center;
  flex-direction: column;
//   align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #eee;
  #success{
    display:flex;
    flex-direction:column;
    
    .city{
      .fs(17);
      display:flex;
      justify-content:space-between;
      align-item:center;
      text-align:center;
      span{
        .fs(13);
       align-self:center;
      }
      .margin(10,0,0,0);
    }
    .ulBox{
      
       .margin(10,0,0,0);
      display:flex;
      flex-direction: column;
      li{
         .margin(10,0,0,0);
         .padding(10,0,10,0);
         color:#111;
         border-bottom:1px solid #aaa;
         display:flex;
          justify-content:space-between;
          align-item:center;
          position:relative;
          overflow:hidden;
      .fs(14);
       .lh(10);
       .h(30);
      //  box-sizing:content-box;
       
      .content{
        
        .lh(20);
       overflow: hidden;
text-overflow:ellipsis;
white-space:nowrap;
          width:90%
      }
      .ulSpan{
      
        display:block;
        align-items:center;
        position:absolute;
          width:12%;
          .fs(20);
        .right(-20);
        .top(18)
      }
      }
    }
  }
  #history{
       .margin(10,0,0,0);
      .searchTop{
          .padding(0,20,0,0);
          display: flex;
          text-align: center;
          justify-items: center;
          align-items: center;
          justify-content: space-between;
          span{
              align-item:left;
              .fs(18);
          }
          i{
                align-item:rigth;
              .fs(14);
          }
      }
  .searchHistory{
     .margin(10,0,0,0);
      li{
            .margin(0,18,10,0);
          float: left;
          border-radius: 5px;
          background:#aaaaaa;
          .padding(8,10,8,10);
          .fs(15);
          color:#fff;
      }
  }
  }
  .dbox {
    .padding(8, 8, 8, 0);
    display: flex;
    justify-content: space-around;
    align-items: center;

    span {
      align-self: center;
      text-align: center;
      .margin(6, -2, 0, 8);

      .fs(14);
      .lh(20);
    }
    .inpp {
      flex: 6;
      background: #0000005c;
      border-radius: 15rem;
      .h(30);
      .margin(8, 0, 0, 0);
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        .fs(14);
      }
      i {
        .fs(16);
        color: #fff;
      }
      input {
        width: 80%;
        .h(20);
        color: #fff;
        background: transparent;
        border: transparent;
        outline: none;
      }
    }
  }
}
</style>
