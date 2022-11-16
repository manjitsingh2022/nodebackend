const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
require("dotenv").config();
require("./config/database").connect();
const auth = require("./middleware/auth");
const bodyParser = require("body-parser");

// start all routes
const User = require("./routes/User");

// bodyparser for mongodb data
console.log("Hi am here");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// API end points
app.use("/", User);

app.post("/home", auth, (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: "error",
      error: "req body cannot be empty",
    });
  }

  res.status(200).json.send("Welcome 🙌 ")({
    status: "succes",
    data: req.body,
  });
});

// Feedback & Error App
app.use((req, res, next) => {
  res.status(404).json({
    error: "Bad Request",
  });
});
module.exports = app;
