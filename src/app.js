const express = require("express");
const connectDB = require("./config/database");
const app = express();
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
app.use(express.json());
app.use(cookieParser());
const {UserAuth}=require("./middlewares/auth");

app.post("/signup", async (req, res) => {
  try {

    //validation of data
    validateSignUpData(req);
    const {firstName, lastName, emailId, password } = req.body;

    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = new User({ firstName, lastName, emailId, password: hashedPassword });

    console.log(user);
    await user.save();
    res.send("user added successfully");
  }
  catch (err) {
    res.status(400).send("Error : " + err.message

    );
  }

});

app.post("/login",async(req, res)=>{
  try{
const {emailId, password} = req.body;
const user= await User.findOne({ emailId: emailId});
if(!user)
{  
  throw new Error("email is  not present in DB");
}
const isPasswordValid=await user.validatePassword(password);
 if(isPasswordValid) 
 {
   //create a jwt token
   const token=await user.getJWT();

   //add the token to the cookie and send back to the user
   res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)});
  res.send("login sucessfully");
 }
 else{
  throw new Error("password is not correct");
 }
}
  catch(err){
    res.status(400).send("Error : "+err.message);
  }
});

app.get("/profile",UserAuth,async(req,res)=>{
  try {
  const user=req.user;
  res.send(user);
  
  } catch (error) {
    res.status(400).send("error:" +error.message);
    
  } 
});
//get user by email
app.get("/user", async (req, res) => {

  // const userEmail=req.body.emailId;
  // try{
  //   const user= await User.find({emailId:userEmail});
  //   res.send(user);

  // }
  // catch(err){
  //   res.status(404).send("something went wrong");
  // }
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {

      res.status(404).send("user not found haha");  //to stop further execution of the code block.  It will not reach the catch block.  It's a way to avoid unhandled promise rejection error.
    }
    else {
      res.send(users);
    }

  }
  catch (err) {
    res.status(404).send("user not found");
  }


});


app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  }
  catch (e) {
    res.status(404).send("somethig went wrong");
  }
});
//feed API -GET/feed -get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);

  } catch (err) {

    res.status(404).send("something went wrong");
  }
});

app.patch("/user", async (req, res) => {

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
connectDB()
  .then(() => {
    console.log("database connection established");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000..");
    });
  }).catch((err) => {
    console.log("database cannot be connected");

  });





