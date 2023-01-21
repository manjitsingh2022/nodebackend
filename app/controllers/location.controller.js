const { default: mongoose } = require("mongoose");
const db = require("../models");
const Location = db.location;

exports.getStores = async (req, res, next) => {
  console.log("req");
  const { city, country,  sort, select,/*  iso2, iso3,featured  */} = req.query;
  const queryObject = {};
  if (city) {
    queryObject.city = { $regex: city, $options: "i" };
  }
  // if (featured) {
  //   queryObject.featured = featured;
  // }
  if (country) {
    queryObject.country = { $regex: country, $options: "i" };
  }
  let apiData = Location.find(queryObject);
  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }
  if (select) {
    // let selectFix = select.replace(",", " ");
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }
//   let page = Number(req.query.page) || 1;
//   let limit = Number(req.query.limit) || 10;
//   let skip = (page - 1) * limit;
//   apiData = apiData.skip(skip).limit(limit);
  console.log(queryObject);
  // Location.apiData
  // const response = await apiData;
  // res.status(200).json({ response, nbHits: response.length });
  try {
    const location = await apiData;
    return res
      .status(200)
      .json({ success: true, count: location.length, data: location , nbHits: location.length });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.getStoresId = async (req, res, next) => {
  console.log({ _id: req.params._id });
  try {
    const location = await Location.findById({ _id: req.params._id });

    return res.status(200).json({
      success: true,
      count: location.length,
      data: location,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: err });
  }
};

exports.store = (req, res, next) => {
  const locationObj = {
    _id: new mongoose.Types.ObjectId(),
    city: req.body.city,
    city_ascii: req.body.city_ascii,
    lat: req.body.lat,
    lng: req.body.lng,
    iso2: req.body.iso2,
    iso3: req.body.iso3,
  };

  if (req.body.parentId) {
    locationObj.parentId = req.body.parentId;
  }
  
    try {
      const location = new Location(locationObj);
      return res
        .status(200)
        .json({ success: true, count: location.length, data: location });
    } catch (error) {
      res.status(500).json({
        error: err,
      });
    }
};

exports.UpdateById = async (req, res, next) => {
  console.log(req.params._id);

    try {
      const location = Location.findOneAndUpdate(
        { _id: req.params._id },
        {
          $set: {
            city: req.body.city,
            city_ascii: req.body.city_ascii,
            lat: req.body.lat,
            lng: req.body.lng,
            iso2: req.body.iso2,
            iso3: req.body.iso3,
            // parentId: req.body.parentId,
          },
        }
      );
      return res
        .status(200)
        .json({ success: true, count: location.length, data: location });
    } catch (error) {
      res.status(500).json({
        error: err,
      });
    }
};

exports.deleteById = async (req, res, next) => {
  // router.delete("/del/:_id", (req, res, next) => {
  // LocationItems.deleteOne({ _id: req.body._id })
  try {
    const location = Location.deleteOne({ _id: req.params._id });
    return res
      .status(200)
      .json({ success: true, count: location.length, data: location });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
