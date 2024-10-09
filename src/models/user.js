const mongoose=require('mongoose');
const validator=require("validator");

const userSchema=new mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String, 
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address.");
            }
        }
    },
    password:{
        type: String
    },  
    age:{ 
        type: Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male", "female","others"].includes(value))
            {
                throw new Error("Invalid gender. Must be either male, female or others.");
            } 
        },
    },
    skills:{
        type:[String]
    },
    about:{
        type:String,
    }
    },{timestamps:true},);
    const User= mongoose.model("User",userSchema);
    module.exports=User; 

    //or
    //module.exports=mongoose.model("User",userSchema);