const mongoose = require("mongoose");
 const Category= new mongoose.Schema({
   category: { type: String, required: true },
   status: { type: Boolean, default: false },
   createdDate: { type: Date, default: +new Date() + 7*24*60*60*1000 },

 })
 module.exports= mongoose.model("category",Category)