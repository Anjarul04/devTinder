const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatuses = ["ignored", "interested"];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).send("Invalid status value : " + status);
      }

      const isValidToUserId = await User.findById(toUserId);
      if (!isValidToUserId) {
        return res.status(400).send("Invalid toUserId : " + toUserId);
      }

      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest) {
        return res
          .status(400)
          .send("Connection request already exists between these users");
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      await connectionRequest.save();
        res.send(`${req.user.firstName} ${req.user?.lastName}, ${status === 'ignored'? 'ignored': 'interested in '} ${isValidToUserId.firstName} ${isValidToUserId?.lastName}`);
    } catch (err) {
      res.status(400).send("something went wrong : " + err.message);
    }
  }
);

requestRouter.post('/request/review/:status/:requestId',userAuth,async(req,res)=>{
  try{
    const loggedInUser = req.user;
    const status = req.params.status;
    const requestId = req.params.requestId;
    const allowedStatuses = ["accepted", "rejected"];

    if(!allowedStatuses.includes(status)){
      return res.status(400).send('Invalid status value : ' + status);
    }

    const existingRequest = await ConnectionRequest.findById(requestId);
    if(!existingRequest){
      return res.status(400).send('Invalid requestId : ' + requestId);
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id : requestId,
      toUserId : loggedInUser._id,
      status :"interested",
    });

    if(!connectionRequest){
      throw new Error('No pending request found');
    }

    connectionRequest.status = status;
    await connectionRequest.save();
    res.send({message :`You have ${status} it`, connectionRequest});

  }catch(err){
    res.status(400).send("something went wrong : " + err.message);
  }
})

module.exports = requestRouter;
