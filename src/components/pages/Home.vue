<template>
	<div class="home">
		<Header></Header>
		<Banner></Banner>
		<Table></Table>
		<Choose></Choose>
		
	</div>
</template>

<script>
import Header from '../common/Header'
import Banner from '../common/Banner'
import Table from '../index/Table'
import Choose from '../index/Choose'
import Footer from '../common/Footer'
	export default{
		
		name:'Home',
		components:{Header,Banner,
		Table,
		Choose,Footer},
		data(){
			return{
				name:'sdagresrho'
			}
		}
	}
</script>

<style lang='less' scoped>  /*scoped形成一个作用域*/
@import "../../style/main.less";

	.home{
		/*background: pink;*/
		/*.w(187.5)*/
		/*.h(45)*/
	}
</style>