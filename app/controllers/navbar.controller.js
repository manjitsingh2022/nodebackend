const { default: mongoose } = require("mongoose");
const db = require("../models");
const Navbar = db.navbar;

exports.getStores = async (req, res, next) => {
  console.log("getdata");
  try {
    const navbar = await Navbar.find();

    return res.status(200).json({
      success: true,
      count: navbar.length,
      data: navbar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: err });
  }
};

exports.getStoresId = async (req, res, next) => {
  console.log({ _id: req.params._id });
  try {
    const navbar = await Navbar.findById({ _id: req.params._id });

    return res.status(200).json({
      success: true,
      count: navbar.length,
      data: navbar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: err });
  }
};

exports.store = (req, res, next) => {
  const navbarObj = {
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    // slug: slugify(req.body.name),
  };

  if (req.body.parentId) {
    navbarObj.parentId = req.body.parentId;
  }
  try {
    const navbar = new Navbar(navbarObj);
    return res
      .status(200)
      .json({ success: true, count: navbar.length, data: navbar });
  } catch (error) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.UpdateById = async (req, res, next) => {
  console.log(req.params._id);
  try {
    const navbar = Navbar.findOneAndUpdate(
      { _id: req.params._id },
      {
        $set: {
          name: req.body.name,
          // slug: slugify(req.body.name),
          // parentId: req.body.parentId,
        },
      }
    );
    return res
      .status(200)
      .json({ success: true, count: navbar.length, data: navbar });
  } catch (error) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.deleteById = async (req, res, next) => {
  // NavbarItems.deleteOne({ _id: req.body._id })
  try {
    const navbar = Navbar.deleteOne({ _id: req.params._id });
    return res
      .status(200)
      .json({ success: true, count: navbar.length, data: navbar });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
