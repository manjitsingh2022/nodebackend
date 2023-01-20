
const { default: mongoose } = require("mongoose");
const db = require("../models");
const Navbar = db.navbar;

exports.getStores = (async (req, res, next) => {
  console.log("getdata",);
  Navbar.find()
    .then((response) => {
      res.status(200).json({
        NavbarData: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });


    
});


exports.getStoresId = (async (req, res, next) => {
  console.log({_id: req.params._id});
  Navbar.findById({ _id: req.params._id })
    .then((response) => {
      res.status(200).json({
        OneNavbarData: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

exports.store = ( (req, res, next) => {
  const navbarObj = {
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    // slug: slugify(req.body.name),
  };

  if (req.body.parentId) {
    navbarObj.parentId = req.body.parentId;
  }
  const navbar = new Navbar(navbarObj);
  navbar
    .save()
    .then((response) => {
      res.status(200).json({
        newNavbar: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});


exports.UpdateById = (async (req, res, next) => {
  console.log(req.params._id);
  Navbar.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: {
        name: req.body.name,
        // slug: slugify(req.body.name),
        // parentId: req.body.parentId,
      },
    }
  )
    .then((response) => {
      res.status(200).json({
        updateNavbar: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

exports.deleteById = (async (req, res, next) => {
// router.delete("/del/:_id", (req, res, next) => {
  // NavbarItems.deleteOne({ _id: req.body._id })
  Navbar.deleteOne({ _id: req.params._id })
    .then((response) => {
      res.status(200).json({
        message: "Navbar Deleted",
        response: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});


