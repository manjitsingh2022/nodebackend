const Category = require("../models/category.model");

// show the list of users
const index = (req, res, next) => {
  Category.find()
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

// 
const show = (req, res, next) => {
  let user_id = req.body.user_id;
  Category.findById(user_id)
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
  console.log(req.body.status, "category");
  let category = new Category({
    category: req.body.category,
    status: req.body.status,
    // createdDate: req.body.createdDate,
  });
  category
    .save()
    .then((response) => {
      res.json({
        response,
        message: " User category add successfully!",
      });
    })
    .catch((error) => {
      console.log("error", error);
      res.json({

        message: "An error Occured custom error",
      });
    });
};

// update an user
const update = (req, res, next) => {
  let user_id = req.body._id;
  console.log(req.body._id, "update");
  let UpdateData = {
    category: req.body.category,
    status: req.body.status,
    createdDate: req.body.createdDate,
  };
  Category.findByIdAndUpdate(user_id, { $set: UpdateData })
    .then((response) => {
      res.json({
        response,
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
  // by body delete
  let user_id = req.body._id;

  // use params by id record delete
  // let user_id = req.params._id;

  Category.findByIdAndRemove(user_id)
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
const deleteAllData = async (req, res, next) => {
try {
    await Category.deleteMany().then((response) => {
      res.json({
        response,
      });
    })
    console.log('All Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
};



module.exports = { index, show, destroy, store, update,deleteAllData };
