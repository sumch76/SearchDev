const jwt=require("jsonwebtoken");
const User=require("../models/user");
 const UserAuth=async(req,res,next)=>{
  try{
    const {token}=req.cookies;
    if (!token)
      {
        throw new Error("Invalid token"); 
      }
    const decodeMessage=await jwt.verify(token,"AbcdDE@123");
    const {_id}=decodeMessage;
    const user=await User.findById(_id);
    if(!user)
    { 
      throw new Error("User not found");
    }
     
    req.user=user;  
    next(); 
  }
  catch(err){
    res.status(401).send("Error: " + err.message);
  }
 }
module.exports={
  UserAuth,
};