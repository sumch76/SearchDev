 const express=require('express');
 const authRouter=express.Router();
 const { validateSignUpData } = require("../utils/validation");
 const bcrypt = require("bcrypt");
 const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);
    const {firstName, lastName, emailId, password } = req.body;

    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = new User({ firstName, lastName, emailId, password: hashedPassword });

    console.log(user);
    await user.save();
    res.send("user added successfully");
  }
  catch (err) {
    res.status(400).send("Error : " + err.message

    );
  }

});
authRouter.post("/login",async(req, res)=>{
  try{
const {emailId, password} = req.body;
const user= await User.findOne({ emailId: emailId});
if(!user)
{  
  throw new Error("email is  not present in DB");
}
const isPasswordValid=await user.validatePassword(password );
 if(isPasswordValid) 
 {
   //create a jwt token
   const token=await user.getJWT();

   //add the token to the cookie and send back to the user
   res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)});
  res.send("login sucessfully");
 }
 else{
  throw new Error("password is not correct");
 }
}
  catch(err){
    res.status(400).send("Error : "+err.message);
  }
});

authRouter.post("/logout", async(req,res)=>{
    try {
        res.cookie("token",null,{expires:new Date(Date.now())});
        res.send("logout sucessfully");
        
    } catch (error) {
        res.status(401).send("Error: " + error.message);
        
    }
})

module.exports=authRouter;
