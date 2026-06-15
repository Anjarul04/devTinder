
const mongoose = require("mongoose");

var validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required."], // Custom error message
    minlength: [2, "First name must be at least 2 characters."],
    maxlength: [50, "First name cannot exceed 50 characters."],
    trim: true, // Removes leading/trailing whitespace
  },
  lastName: {
    type: String,
    minlength: [2, "Last name must be at least 2 characters."],
    maxlength: [50, "Last name cannot exceed 50 characters."],
    trim: true, // Removes leading/trailing whitespace
  },
  emailId: {
    type: String,
    lowercase: true,  // Converts email to lowercase
    required: [true, "Email must be required."], 
    trim: true, // Removes extra spaces before and after
    minlength: [5, "Email must be at least 5 characters long."],
    maxlength: [100, "Email cannot exceed 100 characters."],
    unique: true, // Prevents duplicate emails
    validate(values){
      if(!validator.isEmail(values)){
        throw new Error("invalid email address:   "+values);
      }
    }

  },
  password: {
    type: String,
    required : [true , "password must be required."],
    validate(values){
      if(!validator.isStrongPassword(values)){
        throw new Error("not a strong passwords    :   "+values);
      }
    } 
  },
  age: {
    type: Number,
    min : [12,"min age must be above 12."],

  },
  gender: {
    type: String,
    validate(values){
        if(!["male", "female" , "other"].includes(values)){
            throw new Error("gender not allowed");
        }
    }
  },
  photoUrl:{
    type : String,
    default : "https://vkrvrao.du.ac.in/img/staff/dummy.jpg",
    validate(values){
      if(!validator.isURL(values)){
        throw new Error("invalid url    :   "+values);
      }
    }
  },
  about :{
    type : String,
    default : "I am a passionate developer.",
  },
  skills: {
    type : [String],
  },
}, { timestamps: true });
userSchema.methods.getJWT = async function(){
  const user = this;
  const token = await jwt.sign({_id:user._id},"DevTinder@786",{expiresIn:"7d"});
  return token;
}
userSchema.methods.validatePassword = async function(passwordInputByUser){
  const user = this;
  const hashPassword = this.password;
  const isValidPassword = await bcrypt.compare(passwordInputByUser, hashPassword);
  return isValidPassword;
}
const User = mongoose.model("User", userSchema);

module.exports = User;
