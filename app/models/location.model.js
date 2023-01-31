const mongoose = require("mongoose");
 const LocationSchema= new mongoose.Schema({
    city: { type: String, required: true },
    city_ascii: { type: String , required: true},
    lat: { type: Number , required: true},
    lng: { type: Number, required: true},
    country: { type: String , required: true},
    iso2: { type: String , required: true},
    iso3: { type: String , required: true},
})
module.exports = mongoose.model('Location', LocationSchema);



// const mongoose = require("mongoose");

// const LocationSchema = mongoose.model(
//   "Location",
//   new mongoose.Schema({
//        city: { type: String, required: true },
//         city_ascii: { type: String , required: true},
//         lat: { type: Number , required: true},
//         lng: { type: Number, required: true},
//         country: { type: String , required: true},
//         iso2: { type: String , required: true},
//         iso3: { type: String , required: true},
//   })
// );

// module.exports = LocationSchema;