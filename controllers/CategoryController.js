const Category = require("../models/CategoryModel");

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
  console.log(req.body.category, "category");
  let category = new Category({
    category: req.body.category,
    status: req.body.status,
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
  let user_id = req.body.userID;
  console.log(req.body.user_id, "update");
  let UpdateData = {
    category: req.body.category,
    status: req.body.status,
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
  let user_id = req.body.userID;
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
