const express = require("express");
const app = express();
require("./db/conn");
require("dotenv").config();
require("./config/database").connect();
const auth = require("./middleware/auth");
const bodyParser = require("body-parser");

// start all routes
const User = require('./routes/User')


// bodyparser for mongodb data
console.log("Hi am here")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API end points
app.use('/',  User)
app.use('/login',  User)

app.post("/welcome", auth, (req, res) => {
  console.log('first',res)
  res.status(200).send("Welcome 🙌 ");
});
// Feedback & Error App
  app.use((req, res, next) => {
    res.status(404).json({
      error: "Bad Request",
    });
  });
module.exports = app;
