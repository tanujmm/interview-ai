const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:[true,"This username already taken"]
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  }
})

const userModel=mongoose.model("users-interview",userSchema)

module.exports=userModel