const express = require("express");
const app = express();
require("./db/conn");
const bodyParser = require("body-parser");

// start all routes
const UserRoutes = require('./routes/UserRoute')
const UserLogInRoute = require('./routes/UserLogInRoute')

// const cors = require("cors");
console.log("Hi am here")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API end points
app.use('/user',  UserRoutes)
app.use('/login', UserLogInRoute)

// Feedback & Error App
app.use((req, res, next) => {
  res.status(404).json({
    error: "Bad Request",
  });
});
module.exports = app;
