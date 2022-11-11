const UserLogIn = require("../models/UserLogInModel");

// show the list of users
const index = (req, res, next) => {
    UserLogIn.find()
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






 const login  = async(req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
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

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};






//  all response show  by Id
const show = (req, res, next) => {
  let userID = req.body.userID;
  UserLogIn.findById(userID)
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
  let user = new UserLogIn({
    email: req.body.email,
    password: req.body.password
  });
  console.log(  user,"passs")
  user
    .save()
    .then((response) => {
      res.json({
        message: ("User add successfully!",response),
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
  UserLogIn.findByIdAndUpdate(userID, { $set: UpdateData })
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
  UserLogIn.findByIdAndRemove(UserID)
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

module.exports = { index, show, destroy, store, update,login };
