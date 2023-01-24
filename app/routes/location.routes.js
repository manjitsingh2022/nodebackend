const LocationController = require("../controllers/location.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

app.get('/getlocation', LocationController.getLocation)
app.get('/location/:_id', LocationController.getLocationId)
app.post('/location', LocationController.store)
app.put('/location/:_id', LocationController.UpdateById)
app.delete('/location/delete/:_id', LocationController.deleteById)

}