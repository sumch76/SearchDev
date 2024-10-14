const express=require('express');
const userRouter=express.Router();
const {UserAuth}=require('../middlewares/auth');
const ConnectionRequest=require("../models/connectionRequest");

userRouter.get("/user/requests/received",UserAuth,async(req,res)=>
{
    try {
        const loggedInUser=req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status:"interested",
        }).populate("fromUserId",["firstName","lastName"]);

        res.json({
            message: "data fetched successfully",
            data: connectionRequest,
        });
    } catch (error) {
        res.status(400).send("error:" +error.message);
        
    }
});
userRouter.get("/user/connections",UserAuth,async(req,res)=>
{
    try{
        const loggedInUser=req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id,status: 'accepted'},
                {toUserId: loggedInUser._id,status: 'accepted'},
            ],
        }).populate("fromUserId",["firstName","lastName"]).populate("toUserId",["firstName","lastName"]);

      const data=connectionRequest.map((row)=>
      {
        if(row.fromUserId._id.toString() === loggedInUser._id.toString())
        {
            return row.toUserId;
        }
        return row.fromUserId
    });
        res.json({
            data
        });
    }
    catch(err){
        res.status(400).send("Error : "+err.message);
    }
})


module.exports =userRouter;
 