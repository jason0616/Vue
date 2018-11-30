const express=require('express');
const Router=express.Router();
const goodsModel=require('../model/cartModel.js')
const cors = require('cors')
// const util=require('../utils/utils.js')



const app=express()

Router.get('/goodslist',(req,res)=>{
    // res.header("Access-Control-Allow-Origin","*")
   
    let desc=req.query.desc
    console.log(desc)
    console.log(1)
    console.log(res)
    goodsModel.insertMany({desc})
    .then((data)=>{
     
      
        res.send('ok')

    })
})

module.exports = Router