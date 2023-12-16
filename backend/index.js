const express = require('express');
const mongoose = require('mongoose') 
const cors = require("cors");
require('./db/config');
const User =require("./db/User");
const Product=require('./db/Product');

const Jwt = require('jsonwebtoken');

const jwtkey = 'ecommm';

const app =express();
// app.get("/",(req,resp)=>{
//     resp.send("app is working...") 
// });
// const connectDB = async ()=>{
//     mongoose.connect('mongodb://127.0.0.1:27017/e-com');
//     const productSchema = new mongoose.Schema({
//         name: String,
//         price: Number,
//     });

//     const product =mongoose.model('products',productSchema);
//     const data = await product.find();
//     console.log(data);
// }
// connectDB();
app.use(express.json());
app.use(cors());
app.post("/register",async (req,resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    result =result.toObject();
    delete result.password
    Jwt.sign({result}, jwtkey ,{expiresIn:"2h"}, (error,token)=>{
        if(error){
            resp.send({result:'Something went wrong, please try after some time'})  
        }
        resp.send({result, auth:token})
    })
})
app.post("/login",async (req,res)=>{
    console.log(req.body)
    if(req.body.password&&req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            Jwt.sign({user},jwtkey,{expiresIn:"2h"},(error,token)=>{
                if(error){
                    res.send({result:'Something went wrong, please try after some time'})  
                }
                res.send({user,auth:token})
            })
        
        }
        else{
            res.send({result:'No User Found'})
        }
    }
    else{
        res.send({result:'No User Found'})
    }
})

app.post("/add-product",verifyToken, async (req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})
app.get("/products",verifyToken,async (req,res)=>{
    let products = await Product.find();
    if(products.length>0){
        res.send(products)
    }else{
        res.send({result:"No Products found"})
    }
})


app.delete("/product/:id",verifyToken,async (req,resp)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    resp.send(result);
})

app.get("/product/:id",verifyToken,async (req,resp)=>{
    const result = await Product.findOne({_id:req.params.id})
    
    if(result){
        resp.send(result);
    }else{
        resp.send({result:"NO RECORD FOUND."})
    }
})
app.put("/product/:id",verifyToken, async (req,resp)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set : req.body
        }
    );
    resp.send(result);
})
app.get("/search/:key",verifyToken,async (req,resp)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
        ]
    });
    resp.send(result)
})

function verifyToken(req,resp,next){
    let token =req.headers['authorization']
    if(token){
    token = token.split(' ')[1];
    Jwt.verify(token,jwtkey,(err,valid)=>{
        if(err){
            resp.status(401).send({result:"Please provide valid token"})
        }else{
            next();

        }

    })
    }
    else{
        resp.status(403).send({result:"Please add token with header"})
    }
}
app.listen(5020);