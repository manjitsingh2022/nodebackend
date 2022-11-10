const mongoose = require("mongoose");
// var validator = require('validator');
const userSchema = new mongoose.Schema({
  name:{
    type: String,
  },
  email:{
    type: String,
    unique: [true, " Email id already present"],
  },
  password: {
    type: String,
    required: true, 
    // validator(value) {
    //     console.log(value)
    //     if(value !== this.password2) {
    //         throw new Error("Passwords don't match. Try again.")
    //     }

    //     if(value.length < 8) {
    //         throw new Error("Passwords is too short. At least 8 characters.")
    //     }
    // }
},
phone: {
  type: Number,
 
  }
},{timestamps:true});

const User =  mongoose.model('User' , userSchema);
module.exports = User
