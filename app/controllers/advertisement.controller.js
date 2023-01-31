// const { StatusCodes } = require("http-status-codes");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const db = require("../models");
const Advertisement = db.advertisement;
// show the list of users advertisement
const index = async (req, res, next) => {
  console.log("query", req.query);
  const { category, name, featured, sort, select/* , address  */} = req.query;
  // const queryObject = { $text: { $search: "\"star trek\"  -\"into darkness\"" } };
  const queryObject = {};
  if (category) {
    queryObject.category = { $regex: category, $options: "i" ,category: 'asc',};
  }
  // if (address) {
  //   queryObject.address = address;
  // }
  if (featured) {
    queryObject.featured = featured;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i", };
  }

  let apiData = Advertisement.find(queryObject)
  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }
  if (select) {
    // let selectFix = select.replace(",", " ");
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;
  let skip = (page - 1) * limit;
  apiData = apiData.skip(skip).limit(limit);
  console.log(queryObject);
  // Advertisement.apiData
  
  const response = await apiData;
  res.status(200).json({ response, nbHits: response.length});
};

// Get Product Details
const getProductDetails = async (req, res, next) => {
  const product = await Advertisement.findById(req.params.id);

  if (!product) {
    return next("Product not found", 404);
  }

  res.status(200).json({
    success: true,
    product,
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
  console.log(req.body, "location");
  let advertisement = new Advertisement({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    rating: req.body.rating,
    featured: req.body.featured,
    address: req.body.address,
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
  // let user_id = req.body._id;
  // use params by id record delete
  let user_id = req.params.id;

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
    });
    console.log("All Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
};

// update an user Advertisement
const update = (req, res, next) => {
  let user_id = req.body._id;
  console.log(req.body, "update");
  let UpdateData = {
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    image: req.body.image,
    address: req.body.address,
    rating: req.body.rating,
    createdDate: req.body.createdDate,
  };
  Advertisement.findByIdAndUpdate(
    user_id,
    { $set: UpdateData },
    {
      new: true,
    }
  )
    .then((response) => {
      res.json({
        response,
        message: "Advertisement updated successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "error",
      });
    });
};

const searchAdvertisement = async (req, res, next) => {
  try {
    // const user_id = req.params.id;
    const userData = await Advertisement.findOne({ _id: req.body.user_id });
    console.log("userData", userData);
    //  if (userData) {
    //   if (!req.body.latitude || !req.body.logitude) {
    //     res.status(200).send({success:false,message:"lat and long is not found"})
    //   } else {
    //     const advertisementData=await
    //   }
    //  } else {

    //  }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    console.log("could not find user location", err);
  }
};
module.exports = {
  store,
  index,
  getProductDetails,
  deleteAllData,
  destroy,
  update,
  searchAdvertisement,
};
