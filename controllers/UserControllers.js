const User = require("../models/UserModel");

// show the list of users
const index = (req, res, next) => {
  User.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "an error",
      });
    });
};

const show = (req, res, next) => {
  let userID = req.body.userID;
  User.findById(userID)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "an error Occured",
      });
    });
};

// add new user
const store = (req, res, next) => {
  console.log(req.body.password, "passs");
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.contact,
  });
  user
    .save()
    .then((response) => {
      res.json({
        message: "User add successfully!",
      });
    })
    .catch((error) => {
      console.log("error", error);
      res.json({
        message: "An error Occured",
      });
    });
};

// update an user
const update = (req, res, next) => {
  let userID = req.body.userID;
  console.log(req.body.userID, "update");
  let UpdateData = {
    name: req.body.name,
    email: req.body.email,
  };
  User.findByIdAndUpdate(userID, { $set: UpdateData })
    .then(() => {
      res.json({
        message: "user updated successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "error",
      });
    });
};

// delete an user
const destroy = (req, res, next) => {
  let UserID = req.body.userID;
  User.findByIdAndRemove(UserID)
    .then(() => {
      res.json({
        message: "User delete successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "error",
      });
    });
};
module.exports = { index, show, destroy, store, update };
