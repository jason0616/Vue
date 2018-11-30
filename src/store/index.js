import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state:{
        login:false,
        show:false,
        Fshow:true,
        user:window.localStorage.getItem('user')?window.localStorage.getItem('user'):false
    },
    mutations:{
        userlogin(state,val){
            state.login=val
        },
        Fshowchange(state,val){
            state.Fshow=val
        },
        change(state){
            state.show=false
        },
        changeshow(state,val){
            state.show=val
        },
        user(state,val){
            state.login=val
        }
    }
})
