const express = require("express");
const {UserAuth}=require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const profileRouter=express.Router();

profileRouter.get("/profile/view",UserAuth,async(req,res)=>{
    try {
    const user=req.user;
    res.send(user);
    
    } catch (error) {
      res.status(400).send("error:" +error.message);
    } 
  });
  profileRouter.patch("/profile/edit", UserAuth ,async(req, res) => {

    try {
      if(!validateEditProfileData(req))
        {
        throw new Error("invalid edit request");
      }
      const loggedInUser=req.user;
      Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
       await loggedInUser.save();
  
       res.json({
        message: `${loggedInUser.firstName}, your profile updated successfuly`,
        data: loggedInUser,
    });
  }
    catch (e) {
      res.status(400).send("something went wrong :" + e.message);
    }
  },
  );

  module.exports=profileRouter;