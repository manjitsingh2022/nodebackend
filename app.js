const express = require("express");
const app = express();
const auth = require("./middleware/auth");
require("./db/conn");
require("dotenv").config();
require("./config/database").connect();
const bodyParser = require("body-parser");

// start all routes
const UserRoutes = require('./routes/UserRoute')
const UserLogInRoute = require('./routes/UserLogInRoute')

// bodyparser for mongodb data
console.log("Hi am here")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API end points
app.use('/register',  UserRoutes)
app.use('/login', UserLogInRoute)



app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
  res.status(404).json({
    error: "Bad Request",
  });
});
// Feedback & Error App
// app.use((req, res, next) => {
//   res.status(404).json({
//     error: "Bad Request",
//   });
// });
module.exports = app;
