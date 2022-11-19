const mongoose = require("mongoose");
 const Category= new mongoose.Schema({
   category: { type: String, required: true },
 })
 module.exports= mongoose.model("category",Category)