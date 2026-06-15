const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter the strong password!");
  }
};
const validateEditPorfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};
const validateEditPassword = (req)=>{
  const {currentPassword, newPassword} = req.body;
  if(!validator.isStrongPassword(newPassword)){
    throw new Error("please enter the strong password!");
  }
}

module.exports = { validateSignupData, validateEditPorfileData, validateEditPassword };
