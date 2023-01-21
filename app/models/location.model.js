const mongoose = require("mongoose");
 const LocationSchema= new mongoose.Schema({
    city: { type: String, required: true },
    city_ascii: { type: String},
    lat: { type: Number},
    lng: { type: Number},
    country: { type: String},
    iso2: { type: String},
    iso3: { type: String},
})
module.exports = mongoose.model('Location', LocationSchema);