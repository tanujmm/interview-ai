const userModel=require("../models/user.model")
const blacklistTokenModel=require("../models/blacklist.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")



/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

async function registerUserController(req,res){
  const {username,email,password}=req.body
  if(!username||!email||!password){
    return res.status(400).json({
      message:"Please provide username,email,password"
    })
  }
  const isUsernameExist=await userModel.findOne({$or:[{username},{email}]})
  if(isUsernameExist){
    return res.status(400).json({
      message:"Account already exist with email address or username"
    })
  }
  const hashedPassword=await bcrypt.hash(password,10)

  const newUser=await userModel.create({
    username,
    email,
    password:hashedPassword
  })
  const token=jwt.sign({
    id:newUser._id,
    username:newUser.username
  },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    })

  res.status(201).json({
    message:"User registered successfully",
    user:{
      id:newUser._id,
      email:newUser.email,
      username:newUser.username 
    }
  })
  
}

async function loginUserController(req,res){
  const {email,password}=req.body;
  if(!email||!password){
    return res.status(400).json({
      message:"Invalid credentials"
    })

  }
  const isUserExist=await userModel.findOne({email})

  if(!isUserExist){
    return res.status(400).json({
      message:"User Not exist"
    })
  }
  const parsedPass=await bcrypt.compare(password,isUserExist.password)
  if(!parsedPass){
    return res.status(400).json("Invalid password")
  }
  const token=jwt.sign({
    id:isUserExist._id,
    username:isUserExist.username
  },process.env.JWT_SECRET,{expiresIn:"1d"})

  res.cookie("token",token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
  })
  
  return res.status(201).json({
    message:"User Logged in successfully",
    user:{
      id:isUserExist._id,
      username:isUserExist.username,
      email:isUserExist.email
    }
  })
}

async function logoutUserController(req,res){
    const token=req.cookies.token
    if(token){
      await blacklistTokenModel.create({
        token
      })
    }
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    })
    res.status(200).json({message:"User logout successfully"})
}

async function getUserInfoController(req,res){
  const id=req.user.id

  const user=await userModel.findById(id)
  if(!user){
    return res.status(400).json({message:"Unauthorized access"})
  }
  return res.status(201).json({message:"user info fetched",user:{
    id:user._id,
    username:user.username,
    email:user.email
  }})
}
module.exports={registerUserController,loginUserController,logoutUserController,getUserInfoController}