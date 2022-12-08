const db =require("../models")
const Advertisement =db.advertisement;

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
  
  module.exports={store,index}