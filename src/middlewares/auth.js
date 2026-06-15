const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const userAuth = async (req,res,next)=>{
    try{
    // Reading the token from validate cookie
    //token(Header.Payload.Signature)
    const {token} = req.cookies;
    // console.log(token);
    if(!token){
        throw new Error ("Invalid token");
    }
    // validate the token
    const decodedMessage = await jwt.verify(token,"DevTinder@786");
    // _id => payload
    const {_id} = decodedMessage;
    // Find the user
    const user  = await User.findById(_id)
    if(!user){
        throw new Error("Please Login Again!!");
    }
    req.user = user;
    next();
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
}
module.exports={userAuth};