const advertisementController = require("../controllers/advertisement.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

app.get('/advertisements', advertisementController.index)
// app.get('/show',advertisementController.show)
app.post('/advertisement',advertisementController.store)
// app.patch('/advertisement/update',advertisementController.update)
// app.post('/advertisement/delete',advertisementController.destroy)
// app.delete('/advertisement/deleteRecord',advertisementController.deleteAllData)
}
