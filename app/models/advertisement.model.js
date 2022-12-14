const mongoose = require("mongoose");

const Advertisement = mongoose.model(
  "Advertisement",
  new mongoose.Schema({
    name: { type: String, trim: true },
    description: { type: String },
    image: {
      type: String,
      required: true,
    },
  })
);
module.exports = Advertisement;
