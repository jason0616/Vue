<template>

  <div id="app">

    <router-view v-if='isRouterAlive'></router-view>
    <Footer v-if='isHidden'></Footer>
    <!-- <Footer v-if='this.$store.state.Fshow'></Footer> -->
  </div>

</template>


<script>
import Footer from './components/common/Footer'
import Home from './components/pages/Home'  //引入组件
export default {
  name: 'App',  //当前组件的名字
  components:{
    Home  //引入组件
    ,Footer
  },
  provide(){
    return{
      reload:this.reload,
      hidden:this.hidden
    }
  },
  data(){
  	return{
      num:1,
      isRouterAlive:true,
     isHidden:true
  	}
  },
  methods:{
    reload(){
      this.isRouterAlive=false
      this.$nextTick(()=>{
        this.isRouterAlive=true
      })
    },
      hidden(val){
      this.isHidden=val
      this.$nextTick(()=>{
        //this.isHidden=false
      })
    },
  	add(){
  		this.num++
    // },
    // fshow(val){
    //   this.Fshow=val
    // }
  },
  },
  // watch:{
  //   $router(e){
  //     if(e.name='login'){
  //        this.Fshow=false
  //     }
  //     console.log(e)
  //   }
  // },
  created(){
  //	console.log('created')
  },
  mounted(){
  //	console.log('mounted')
  },
  updated(){
  //	console.log('updated')
  }
}
</script>

<style>
#app {
}
</style>
