const mongoose = require('mongoose');
const connectionRequestSchema=new mongoose.Schema(
    {
        fromUserId:{
            type: mongoose.Schema.Types.ObjectId,
           reqired: true
        },
        toUserId:{
            type: mongoose.Schema.Types.ObjectId,
            reqired: true
        },
        status:{
            type:String,
            enum:{
                values:["ignore","interested","accepted","rejected"],
                message: `{VALUE} is incorrect status type`,
            },

        },
    },
    {
        timestamps:true,
    }
);