const mongoose = require("mongoose");
// const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    minlength: 3,
    // enum : ["ram","sham", ]
  },

  email: {
    type: String,
    // required: true,
    unique: [true, " Email id already present"],

    // validate(value) {
    //   if (!validator.isEmail(value)) {
    //     throw new Error("Invalid Email");
    //   }
    // },
  },

  phone: {
    type: Number,
    min: 10,
   
    // required: true,
    unique: true,
  },
  address: {
    type:String,
    // required:true
    }
});

const User = new mongoose.model('User' , userSchema);
module.exports = User
