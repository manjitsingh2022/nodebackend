const db = require("../models");
const Advertisement = db.advertisement;

// show the list of users advertisement
const index = (req, res, next) => {
  Advertisement.find()
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

// const index = async (req, res, next) => {
//   try {
//     const advertisement = await Advertisement.find();
//     res.status(200).json({
//       success: true,
//       advertisement,
//     });
//   } catch (error) {
//     console.log("error", error);
//     res.json({
//       message: "An error Occured custom error",
//     });
//   }
// };
// add new user advertisement
const store = (req, res, next) => {
  console.log(req.body.name, "name");
  let advertisement = new Advertisement({
    name: req.body.name,
    description: req.body.description,
    // createdDate: req.body.createdDate,
  });
  advertisement
    .save()
    .then((response) => {
      res.json({
        response,
        message: " User Advertisement add successfully!",
      });
    })
    .catch((error) => {
      console.log("error", error);
      res.json({
        message: "An error Occured custom error",
      });
    });
};

// delete an user Advertisement
const destroy = (req, res, next) => {
  // by body delete
  let user_id = req.body._id;
  // use params by id record delete
  // let user_id = req.params._id;

  Advertisement.findByIdAndRemove(user_id)
    .then(() => {
      res.json({
        message: "Advertisement delete successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "error",
      });
    });
};
// deleteAll an user Advertisement
const deleteAllData = async (req, res, next) => {
  try {
      await Advertisement.deleteMany().then((response) => {
        res.json({
          response,
        });
      })
      console.log('All Data successfully deleted');
    } catch (err) {
      console.log(err);
    }
  };
module.exports = { store, index ,deleteAllData,destroy};
