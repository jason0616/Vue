//自定义指令文件
//(在任意标签内添加 v-go-top:click 即可实现点击 置顶功能)

import Vue from 'vue'
//实现回到顶部
Vue.directive('go-top',{
	bind(el,binding,vnode){
		//监听元素是否被点击
		console.log(binding)
        let eventType=binding.arg
		el.addEventListener(eventType,()=>{
			console.log('返回顶部')
		document.documentElement.scrollTop=0;
		})
	}
})