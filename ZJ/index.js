import BackTop from './components/BackTop';

let scrollEvent=function(gun,vnode){
	return function(){
		//console.log(111)
	let bodyGun=document.documentElement.scrollTop
        if(bodyGun>=gun){
        	vnode.context.isShow=true;
        }else{
        	vnode.context.isShow=false;
        }
//   console.log(bodyGun)  //查看body滚动的值(当前位置)
	}
}
export default{
	install(Vue){
//		console.log(111)
		Vue.component('back-top',BackTop)
		Vue.directive('scroll-hide',{
			bind(el,binding,vnode){
				console.log(el)  //自定义指令绑定的节点
				console.log(binding)//绑定对象
				console.log(vnode)//虚拟dom
//				vnode.context.isShow=true;  //改变vnode里(虚拟dom)的isShow(配置项)的参数
                 let gun=el.getAttribute('scroll-hide-distance');  //获取设定的阀值
                 console.log('阀值:'+gun+'显示置顶')
				window.addEventListener('scroll',scrollEvent(gun,vnode))
			},
			unbind(el,binding,vnode){
				let gun=el.getAttribute('scroll-hide-distance');  //获取设定的阀值
				console.log('解绑')
				window.removeEventListener('scroll',scrollEvent(gun,vnode))
			}
		})
		//创建自定义指令
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
	}
}
