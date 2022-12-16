const mongoose=require("mongoose");

const addressSchema=mongoose.Schema({
    user:{type:mongoose.Types.ObjectId,ref:"user",required:true},
    fullname:{type:String,required:true},
    landmark:{type:String},
    city:{type:String,required:true},
    state:{type:String,required:true},
    zipcode:{type:Number,required:true},
    mobile:{type:Number,required:true}
})

const Addressmodel=mongoose.model("address",addressSchema);

module.exports={Addressmodel}