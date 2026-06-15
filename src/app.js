const express = require("express");
const app = express();
const { connectDB } = require("./config/database.js");
const cookieParser = require("cookie-parser");
var cors = require("cors");

const authRouter = require("./routers/auth.js");
const profileRouter = require("./routers/profile.js");
const requestRouter = require("./routers/request.js");
const userRouter = require("./routers/user.js");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("server is successfully running on port 7777...");
    });
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });
