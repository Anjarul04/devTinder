const validator = require('validator');
const User = require('../models/user.js');

const validationSignUpData = async (data) => {
    const { firstName, lastName, emailId, password } = data;

    if (!validator.isEmail(emailId)) {
        throw new Error('Invalid Email Address: ' + emailId);
    }
    const emailExist = await User.findOne({ emailId });
    if (emailExist) {
        throw new Error('Email ID already exists: ' + emailId);
    }
    if (!firstName || firstName.length < 3 || firstName.length > 30) {
        throw new Error('First name must be between 3 and 30 characters long');
    }
    if (!lastName || lastName.length < 3 || lastName.length > 30) {
        throw new Error('Last name must be between 3 and 30 characters long');
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough: ' + password);
    }
};
    
const validationLogInData = (data)=>{
    const {emailId, password} = data;
    if(!emailId ){
        throw new Error('EmailId is required');
    }else if(!password){
        throw new Error('Password is required');
    }
    if(!validator.isEmail(emailId)){
        throw new Error('Invalid Email Address : '+emailId);
    }
    
}

const allowedUpdateUserData = (req)=>{
    const allowedUpdates = ['firstName', 'lastName', 'age', 'skills', 'gender', 'about','photoUrl'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if(!isValidOperation){
        throw new Error('Invalid updates! Allowed updates are: ' + allowedUpdates.join(', '));
    }
}

module.exports = { validationSignUpData,validationLogInData,allowedUpdateUserData };
