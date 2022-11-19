const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  phone: { type: Number, unique: true },
  // category: { type: String, required: true },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);
