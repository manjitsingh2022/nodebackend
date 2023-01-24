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
    location: { type: { type: String }, coordinates: [Number] },
    // Working in this field as video link share  link=https://www.youtube.com/watch?v=RxkgrRzLVhw&list=PLwGdqUZWnOp1ve9jXCz9apbouv-eAMi6E&index=8
    // company: {
    //   type: String,
    //   enum: ["apple", "dell", "mi"],
    //   message: `{VALUE} is not supported.`,
    // },
  })
);
module.exports = Advertisement;
