
const express = require("express");
const {UserAuth}=require("../middlewares/auth");
const profileRouter=express.Router();

profileRouter.get("/profile/view",UserAuth,async(req,res)=>{
    try {
    const user=req.user;
    res.send(user);
    
    } catch (error) {
      res.status(400).send("error:" +error.message);
      
    } 
  });
  profileRouter.patch("/user", async (req, res) => {

    const userId = req.body.userId;
    const data = req.body;
    try {
      const Allowded_fields = ["about", "skills", "age", "gender", "userId"]
      const isUpdated = Object.keys(data).every((k) =>
        Allowded_fields.includes(k));
      if (!isUpdated) {
        throw new Error("Invalid fields to update");
      }
  
      if (data?.skills.length > 10) {
        throw new Error("Skills should not be more than 10");
      }
      await User.findByIdAndUpdate({ _id: userId }, data, {
        runValidators: true,
      });
  
      res.send("user added successfully");
    }
    catch (e) {
      res.status(404).send("something went wrong" + e.message);
    }
  
  },
  );

  module.exports=profileRouter;