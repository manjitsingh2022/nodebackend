const { StatusCodes } = require("http-status-codes");
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  console.log("first",req.body.username)
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err });
      return;
    }

    if (user) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err });
        return;
      }

      if (user) {
        res.status(StatusCodes.BAD_REQUEST).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(StatusCodes.BAD_REQUEST).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;