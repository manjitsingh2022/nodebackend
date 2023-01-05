const advertisementController = require("../controllers/advertisement.controller");
const uploadController = require("../controllers/upload.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/upload", uploadController.upload, (req, res) => {
    if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false,
      });
    } else {
      console.log("file received");
      return res.send({
        success: true,
      });
    }
  });
  app.get("/advertisements", advertisementController.index);
  app.get('/advertisement/:id',advertisementController.getProductDetails)
  app.post("/advertisement", advertisementController.store);
  // app.patch('/advertisement/update',advertisementController.update)
  app.delete("/advertisement/:id", advertisementController.destroy);
  app.delete(
    "/advertisement/deleteRecord",
    advertisementController.deleteAllData
  );
};
