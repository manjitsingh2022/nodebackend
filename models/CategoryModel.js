const mongoose = require("mongoose");
 const Category= new mongoose.Schema({
   category: { type: String, required: true },
 status: { type: Boolean, default: false }
 })
 module.exports= mongoose.model("category",Category)