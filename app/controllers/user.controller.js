const { StatusCodes } = require("http-status-codes");

exports.allAccess = (req, res) => {
    res.status(StatusCodes.OK).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(StatusCodes.OK).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(StatusCodes.OK).send("Admin Content.");
  };
  
  // exports.moderatorBoard = (req, res) => {
  //   res.status(StatusCodes.OK).send("Moderator Content.");
  // };