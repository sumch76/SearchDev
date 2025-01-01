const express=require('express');
const userRouter=express.Router();
const {UserAuth}=require('../middlewares/auth');
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user");

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
userRouter.get("/feed",UserAuth,async(req,res)=>
{
    try {
        const loggedInUser=req.user;


        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id},
            ], 
        }).select("fromUserId toUserId")
        // populate("fromUserId",["firstName","lastName"])
        // .populate("toUserId",["firstName","lastName"]);


        const hideUsersFromFeed=new Set();
        connectionRequest.forEach((req)=>
        {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });
        const users =await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUsersFromFeed)}},
                {_id:{$ne:loggedInUser._id}},
            ],
        }).select(["firstName","lastName", "age" ,"photoURL","gender" ,"about"])
        .skip(skip)
        .limit(limit);


        res.json({data:users})
    } catch (error) {
        res.status(400).send("error:" +error.message);
        
    }
 });

module.exports =userRouter;
 