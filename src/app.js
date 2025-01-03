const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser=require("cookie-parser");
const cors=require("cors");

app.use(cors(
  {
    origin:"http://localhost:5173",
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE','OPTIONS'],
    credentials: true,
  }
))
app.use(express.json());
app.use(cookieParser());
 
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
connectDB()
  .then(() => {
    console.log("database connection established");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000..");
    });
  }).catch((err) => {
    console.log("database cannot be connected");

  });





