const express = require("express");

const authRouter = express.Router();

const User = require("../models/user.js");
const bcrypt = require("bcrypt");

const {
  validationSignUpData,
  validationLogInData,
} = require("../utils/validation.js");
const { userAuth } = require("../middlewares/auth.js");

authRouter.post("/signup", async (req, res) => {
  const data = req.body;
  const { firstName, lastName, emailId, password, age, skills, gender, about } =
    data;
  // after validation then incrypt the password
  // then save the user to database
  // fist validate the data
  try {
    await validationSignUpData(data);

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token);
    res.status(201).json({
      message: "User signed up successfully",
      data: savedUser,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});
authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
   
    validationLogInData(req.body);
   
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("User not found with emailId : " + emailId);
      
    }

    const isPasswordMatch = await user.validatePassword(password);
    if (!isPasswordMatch) {
      throw new Error("Invalid password");
    }

    const jwtToken = await user.getJWT();
    res.cookie("token", jwtToken);

    res.status(200).send({message:"user loggin successfully!!!",user});
  } catch (err) {
    res.status(400).send("something went wrong : " + err.message);
  }
});

authRouter.post("/logout", userAuth, (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(0) });
    res.send("User logged out successfully");
  } catch (err) {
    res.status(400).send("something went wrong : " + err.message);
  }
});

module.exports = authRouter;
