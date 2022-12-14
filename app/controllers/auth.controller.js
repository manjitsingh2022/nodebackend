const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");

exports.signup = (req, res) => {
  console.log(req.body, "body");
  // console.log(req.body.role,"role");
  // console.log(req.body.username,"username");
  // console.log(req.body.email,"email");
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    category: req.body.category,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    // username: req.body.username,
    email: req.body.email,
    
  })

    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      console.log("password is vaild", req.body.password);
      if (!passwordIsValid) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      console.log("authorities", authorities);
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        category: user.category,
        roles: authorities,
        accessToken: token,
      });
    });
};

// Delete an user
exports.deleteOne = (req, res, next) => {
  // by body delete
  let user_id = req.body._id;
  // use params by id record delete
  // let user_id = req.params._id;

  User.findByIdAndRemove(user_id)
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

// deleteAll an user
exports.deleteAll = async (req, res, next) => {
  try {
    await User.deleteMany().then((response) => {
      res.json({
        response,
      });
    });
    console.log("All Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
};

// // update an user
exports.updateUser = async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "user not found",
    });
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(StatusCodes.OK).json({ success: true, user });
};



// // update an user
// exports.updateUser = (req, res, next) => {
//   let userID = req.body._id;
//   console.log(req.body.userID, "update");
//   let UpdateData = {
//     name: req.body.name,
//     email: req.body.email,
//     category: req.body.category,
//     password: req.body.password,
//   };
//   User.findByIdAndUpdate(userID, { $set: UpdateData })
//     .then(() => {
//       res.json({
//         message: "user updated successfully!",
//       });
//     })
//     .catch((error) => {
//       res.json({
//         message: "error",
//       });
//     });
// };

// Show the list of Users
exports.userList = (req, res, next) => {
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




// update an user
// exports.update = (req, res, next) => {
//   let user_id = req.body._id;
//   console.log(req.body._id, "update");
//   let UpdateData = {
//     username: req.body.username,
//     password: req.body.password,
//     // createdDate: req.body.createdDate,
//   };
//   User.findByIdAndUpdate(user_id, { $set: UpdateData })
//     .then((response) => {
//       res.json({
//         response,
//         message: "user updated successfully!",
//       });
//     })
//     .catch((error) => {
//       res.json({
//         message: "error",
//       });
//     });
// };

// exports.Update = async (req, res) => {
//   User.updateOne(
//     { _id: req.params._id },
//     // {
//     //   $set: {
//     //     username: req.body.username,
//     //     password: req.body.password,
//     //   },
//     // },
//     function (err, persona) {
//       if (err) res.send(err);

//       // Obtine y devuelve todas las personas tras crear una de     ellas
//       User.find(function (err, user) {
//         if (err) res.send("Ha habido un error" + err);
//         console.log("Se va a enviar " + persona);
//         res.json(user);
//       });
//     }
//   );
// };

// exports.Update = (req, res) => {
//   User.updateOne( { _id: req.params._id }, {
//     // $set: {
//     //   roles: req.body.roles,
//     //   email: req.body.email,
//     //   username: req.body.username,
//     // },
//   },)

//     .populate("roles", "-__v")
//     .exec((err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//       }

//       // var authorities = [];
//       // console.log("authorities", authorities);
//       // for (let i = 0; i < user.roles.length; i++) {
//       //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
//       // }
//       res.status(200).send({
//         id: user._id,
//         username: user.username,
//         // roles: authorities,
//       });
//     });
// };

// Delete an user
// exports.singledelete = async (req, res) => {
//   try {
//     User.findOneAndDelete({ _id: req.params.id }, (err, result) => {
//       console.log(req.params.id, "dklsdsd");
//       if (err) {
//         console.log("Error", err);
//       } else {
//         res.redirect("/");
//         console.log(result + " - " + req.params.id);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
