const express = require('express');
const { UserAuth } = require('../middlewares/auth');
const requestRouter=express.Router();

requestRouter.post(
    "/request/send/interested/:toUserId",UserAuth,async(req,res)=>
{
    try {
   req.user
        
    } catch (error) {
        res.status(400).send("Error"+error.message);   
    }
    res.send(user.firstName+"send a connection request");
});
module.exports=requestRouter; 