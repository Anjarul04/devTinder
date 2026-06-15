const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user.js");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName photoUrl about skills");

    if (connectionRequests.length === 0) {
      return res.status(200).send("No connection requests found!!!");
    }

    res.send(connectionRequests);
  } catch (err) {
    res.status(400).send("something went wrong : " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName skills about photoUrl")
      .populate("toUserId", "firstName lastName skills about photoUrl");

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.toUserId;
      }
      return row.fromUserId;
        
    });
    res.send(data);
  } catch (err) {
    res.status(404).send("somthing went wrong", err.message);
  }
});

userRouter.get('/feed', userAuth, async(req,res)=>{
  try{
    const loggedInUser = req.user;
    let limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page-1)*limit;
    limit = limit > 50?50:limit;
    

    const connectionRequest = await ConnectionRequest.find({
      $or:[
        {fromUserId:loggedInUser._id},
        {toUserId:loggedInUser._id},
      ]
    });

  
    const hideFromUserFeed = new Set();
    connectionRequest.forEach((row)=>{
      hideFromUserFeed.add(row.fromUserId.toString());
      hideFromUserFeed.add(row.toUserId.toString());
    });
    
    const user = await User.find({
      $and:[{_id: {$nin: Array.from(hideFromUserFeed)}},
        {_id: {$ne: loggedInUser._id}}]
    }).select("firstName lastName skills about photoUrl").skip(skip).limit(limit);

    res.json({data:user});


  }catch(err){
    res.status(400).send("somthing went wrong  "+err.message);
  }
})

module.exports = userRouter;
