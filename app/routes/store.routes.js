const storeController = require("../controllers/store.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

app.get('/location', storeController.getStores)
app.post('/location', storeController.addStore)

}


// const express = require('express');
// const { getStores, addStore } = require('../controllers/stores');

// const router = express.Router();

// router
//   .route('/')
//   .get(getStores)
//   .post(addStore);

// module.exports = router;