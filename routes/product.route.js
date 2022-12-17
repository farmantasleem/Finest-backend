const express=require("express");
const {Productmodel}=require("../model/product.model")
const productRouter=express.Router();
const mongoose=require("mongoose")

//get all the products

productRouter.get("/all",async(req,res)=>{
        try{
            const allProduct=await Productmodel.find();
            res.status(200).send(allProduct)
        }
        catch(err) {
            res.status(500).send({"msg":err.message})
        }
})

//get product based on pryage || catego || brand

//query - multiple things filter

//params - one filter

//params - product/productid

//url/search?page=1&category=bakery&brand=nivea

//pagination .limit(9) skip()
//page no=

productRouter.get("/",async(req,res)=>{
    const {page,category,brand,filter}=req.query  //query 
    const toshow=(page-1)*9
    const sorting=filter||1
    try{
        let product_data;
     if(category&&brand){
         product_data=await Productmodel.find({category,brand}).skip(toshow||0).limit(9).sort({cost:sorting})
     }else if(category){
         product_data=await Productmodel.find({category}).skip(toshow||0).limit(9).sort({cost:sorting})
     }else if(brand){
         product_data=await Productmodel.find({brand}).skip(toshow||0).limit(9).sort({cost:sorting})
     }else{
        product_data=await Productmodel.find().skip(toshow||0).limit(9).sort({cost:sorting})
     }
        
        res.status(200).send(product_data)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

//get products based on search and apply filter based on q && page || category || brand

//product?q=paneer 

productRouter.get("/search",async(req,res)=>{

    const {q,page,category,brand}=req.query;

    const showpage=(page-1)*9
        try{
            let alldata;
          if(category&&brand){
    
            alldata=await Productmodel.find({title: new RegExp(q,"i"),category,brand}).skip(showpage||0).limit(9)
          }else if(category){
            alldata=await Productmodel.find({title: new RegExp(q,"i"),category}).skip(showpage||0).limit(9)
          }else if(brand){
            alldata=await Productmodel.find({title: new RegExp(q,"i"),brand}).skip(showpage||0).limit(9)
          }else{
            alldata=await Productmodel.find({title: new RegExp(q,"i")}).skip(showpage||0).limit(9)
          }
            res.status(200).send(alldata)
        }catch(err){
            res.status(400).send({"msg":err.message})
        }
})


//get specific product

productRouter.get("/:productid",async(req,res)=>{
        const productid=req.params.productid
        try{
            const product=await Productmodel.findOne({_id:productid})
            if(Object.keys(product).length>1){
                res.status(200).send(product)
            }else{
                res.status(404).send({"msg":"Product not found"})
            }
        }catch(err){
            res.status(404).send({"msg":err.message})
        }
})

//get filter 




module.exports={productRouter}