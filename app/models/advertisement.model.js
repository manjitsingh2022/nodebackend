const mongoose = require("mongoose");

const Advertisement = mongoose.model(
  "Advertisement",
  new mongoose.Schema({
    name: { type: String, trim: true },
    description: { type: String },
    category: { type: String },
    rating: { type: Number, default: 4.9 },
    featured: { type: Boolean, default: false },
    image: {
      type: String,
      required: true,
    },
    address: {
        type: Object, 
        required: true,
    },
   
  })
);
module.exports = Advertisement;
