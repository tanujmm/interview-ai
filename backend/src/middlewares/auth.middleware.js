const jwt=require("jsonwebtoken")
const blacklistTokenModel = require("../models/blacklist.model")

async function authUser(req,res,next){
  const token=req.cookies.token
  if(!token){
    return res.status(401).json({message:"token not provided"})
  }
    const blacklistToken=await blacklistTokenModel.findOne({token})
    if(blacklistToken){
      return res.status(401).json({message:"Token is blacklisted"})
    }
  
  try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user=decoded
    next()
    
  } catch (error) {
    return res.status(401).json({message:"Invalid token"})
  }
   
}
module.exports={authUser}