const express = require("express");

const { connectDB } = require("./config/database.js");

const app = express();

const User =  require("./models/user.js");

app.post("/signup",async(req, res)=>{
    const userObject = {
        firstName : "Anjarul",
        lastName : "Haque",
        email : "haqueanjarul232@gmail.com",
        password : "march2025",
    }
    //creating a new instance of the model
    const user =  new User(userObject);
    try{
        await user.save();
        res.send("data added successfully");
    }catch(err){
        res.status(400).send("error saving the user: "+err.User.name);
    }

})

connectDB()
  .then(() => {
    console.log("database connection established");
    app.listen(7777, () => {
        console.log("server is listening succesfully on port no 7777...");
      });
  })
  .catch((err) => {
    console.log("database not to be established");
  });
