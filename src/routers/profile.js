const express = require('express');

const profileRouter = express.Router();

const { userAuth } = require('../middlewares/auth.js');

const { allowedUpdateUserData } = require('../utils/validation.js');
const validator = require('validator');
const bcrypt = require('bcrypt');

profileRouter.get('/profile/view',userAuth, async(req, res)=>{
    try{
        const user = req.user;

        res.send(user);

    }catch(err){
        res.status(400).send('something went wrong : '+ err.message);
    }
});

profileRouter.patch('/profile/edit',userAuth, async(req, res)=>{
    try{
        allowedUpdateUserData(req);
        const user = req.user;
        const updates = Object.keys(req.body);

        updates.forEach((update)=>{
            user[update] = req.body[update];
        })
        await user.save();

        res.json({message:"Profile updated successfully", user});

    }catch(err){
        res.status(400).send('something went wrong : '+ err.message);
    }
});

profileRouter.patch('/profile/password',userAuth, async(req, res)=>{
    try{
        const user = req.user;
        const {oldPassword, newPassword} = req.body;

        if(!oldPassword || !newPassword){
            throw new Error('Both oldPassword and newPassword are required');
        }
        const isMatch = await user.validatePassword(oldPassword);
        if(!isMatch){
            throw new Error('Old password is incorrect');
        }
        if(!validator.isStrongPassword(newPassword)){
            throw new Error('New password is not strong enough : '+newPassword);
        }
        const encryptedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = encryptedNewPassword;
        await user.save();
        res.json({message:"Password updated successfully"});
    }catch(err){
        res.status(400).send('something went wrong : '+ err.message);
    }
});

module.exports = profileRouter;