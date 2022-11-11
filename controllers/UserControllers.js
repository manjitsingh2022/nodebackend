const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
var { expressjwt: jwt } = require("express-jwt");
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
    phone: req.body.phone,
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

const register = async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { name, email, password, phone } = req.body;

    // Validate user input
    if (!(email && password && name && phone)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name,
      phone,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

// update an user
const update = (req, res, next) => {
  let userID = req.body.userID;
  console.log(req.body.userID, "update");
  let UpdateData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
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
module.exports = { index, show, destroy, store, update, register };
