const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const http = require('http');
const initializeSocket = require("./utils/socket");

dotenv.config();

app.use(cors(
  {
    origin: process.env.CLIENT_URL?.replace(/\/$/, ""),
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  }
));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);


connectDB()
  .then(() => {
    console.log("database connection established");
    // Only listen if the file is run directly (not imported as a module by Vercel)
    if (require.main === module) {
      const port = process.env.PORT || 3000;
      server.listen(port, () => {
        console.log(`Server is successfully listening on port ${port}..`);
      });
    }
  }).catch((err) => {
    console.log("database cannot be connected");
  });

module.exports = app;
