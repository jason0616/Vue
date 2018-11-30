<template>
	<div class="back-top" v-scroll-hide='isShow' scroll-hide-distance='700' v-go-top:click  >
    <transition enter-active-class='fadeIn animated' leave-active-class='fadeOut animated'>
    	<div class="contain-box" v-show='isShow'>
    	    <i class="fa fa-arrow-circle-up"></i>
    	</div>
    </transition>
	</div>
</template>

<script>
	export default{
		name:'back-top',
		data(){
			return {
				isShow:false
			}
		}
	}
</script>
<style lang='less' scoped>
@import url("../styles/animation.min.css" );
.back-top{
	position: fixed;
	right: 0.6rem;
	bottom: 1.6rem;
	.contain-box{
		font-size: 45px;
	    .fa-arrow-circle-up{
	    	background: #fff;border-radius: 56%;color:#58bc58;
	    }
	}
	&[size='small']{
		.contain-box{
			font-size: 35px;
		}
	}
	&[size='big']{
		.contain-box{
			font-size: 55px;
		}
	}
}
</style>