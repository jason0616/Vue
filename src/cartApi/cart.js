const express=require('express');
const app=express()
const db=require('./dbconnect.js')
const cart=require('./router/addcart.js')
const cors=require('cors')
// const path=require('path')

app.use('/api/cart',cart)
app.use(cors());

// app.all("*",function(req,res,next){
//     //设置允许跨域的域名，*代表允许任意域名跨域
//     res.header("Access-Control-Allow-Origin","*");
 
//      next();// 一定要继续

// })

app.listen(1234,()=>{
    console.log('服务器开启')
})

