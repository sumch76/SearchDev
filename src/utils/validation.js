const validator=require("validator");
const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName)
    {
        throw new Error("name is not valid!!");
    }

    else if(firstName.length<4||firstName.length>50)
    {
        throw new Error("first name should be greater than 4 and less than 50");
        
    }

else if(!validator.isEmail(emailId))
{
    throw new Error("email is not valid");
}
else if(!validator.isStrongPassword(password)){
    throw new Error("Password is not strong enough");
}
};
module.exports={validateSignUpData  

}