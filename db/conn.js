const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017", {
useNewUrlParser: true, 
useUnifiedTopology: true 
}).then(()=> {
console.log("connection is successful mongoDB");
}).catch((e) =>{
console.log("No connection");
})


