const express=require("express");
const { Authentication } = require("../middleware/Authentication");
const { Cartmodel } = require("../model/cart.model");

const cartRoute=express.Router();


//adding cart item

cartRoute.post("/",Authentication,async(req,res)=>{
    const userid=req.body.userid;
   
try{
    const exist=await Cartmodel.findOne({...req.body,user:userid})
    if(exist?._id!==undefined){
        res.status(404).send({msg:"Product already in cart"})
    }else{
        if(!Object.keys(exist).length>0){
            try{
       
           const newItem=await Cartmodel({...req.body,user:userid})
           await newItem.save();
           res.status(200).send({"msg":"Successfully send"})
       }
       catch(err){
           res.status(404).send({msg:err.message})
       }
           
   
       }else{
           res.status(404).send({msg:"Product already in cart"})
       }
    }
}catch(err){
    res.status(404).send({msg:err.message})
}
  
})

// Getting cart item for specific user

cartRoute.get("/",Authentication,async(req,res)=>{
    const userid=req.body.userid;
    try{
        const alldata=await Cartmodel.find({user:userid}).populate("product")
        res.status(200).send(alldata)
    }catch(err){
        res.status(404).send({"msg":err.message})
    }

})

//delete cart item

cartRoute.delete("/:productid",Authentication,async(req,res)=>{
    const productid=req.params.productid;
    const userid=req.body.userid
    try{
        await Cartmodel.findOneAndDelete({user:userid,product:productid});
        res.status(200).send({"msg":"Deleted Successfully"})
    }
    catch(err){
        res.status(400).send({"msg":err.message})
    }

})

// Updating Quantity

cartRoute.patch("/:cartid",Authentication,async(req,res)=>{
    const userid=req.body.userid;
    const cartitem=req.params.cartid;
    const qty=req.body.qty||1

    try{
     

           const Updated_version= await Cartmodel.findOneAndUpdate({_id:cartitem},{qty})
            res.status(200).send({"msg":"Updated",Updated_version})
     

    }
    catch(err){
        res.status(404).send({"msg":err.message})
    }
})


module.exports={cartRoute}

