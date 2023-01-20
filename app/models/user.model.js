const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {type:String},
    email: {type:String},
    password: {type:String},
    category: {type:String},
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      }
    ],
    
  })
  
);


module.exports = User;