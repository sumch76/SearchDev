const mongoose=require('mongoose');

const connectDB=async()=>
{
    await mongoose.connect(
        "mongodb+srv://sumitchaubey76:Tq9KWbiJafPhz9qu@mongodbtest.9axqh.mongodb.net/DevTinder"
                          );
};
module.exports=connectDB
