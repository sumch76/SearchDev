const mongoose=require('mongoose');
const validator=require("validator");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

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
    userSchema.index({firstName: 1, lastName: 1})

    userSchema.methods.getJWT=async function(){
        const user =this;
        const token=await jwt.sign({_id:user._id},"AbcdDE@123",{expiresIn:"7d",});

        return token;
    };
    userSchema.methods.validatePassword = async function(password){
        const user =this;
        const isPasswordValid=await bcrypt.compare(password, user.password);
        return isPasswordValid;
     };
    const User= mongoose.model("User",userSchema);
    module.exports=User; 

    //or
    //module.exports=mongoose.model("User",userSchema);
