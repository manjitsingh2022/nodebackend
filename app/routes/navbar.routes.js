
const navbarController = require("../controllers/navbar.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

app.get('/shop', navbarController.getStores)
app.get('/shop/:_id', navbarController.getStoresId)
app.post('/shop', navbarController.store)
app.put('/shop/:_id', navbarController.UpdateById)
app.delete('/shop/delete/:_id', navbarController.deleteById)

}