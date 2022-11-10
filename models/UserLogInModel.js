const mongoose = require("mongoose");
// var validator = require('validator');
const userLogInSchema = new mongoose.Schema({
  email:{
    type: String,
  },
  password: {
    type: String,
    required: true, 
},
},{timestamps:true});
const UserLogIn =  mongoose.model('LogIn' , userLogInSchema);
module.exports = UserLogIn
