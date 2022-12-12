const categoryController = require("../controllers/category.controller")

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

app.get('/categories', categoryController.index)
app.get('/show',categoryController.show)
app.post('/category',categoryController.store)
app.patch('/update',categoryController.update)
app.post('/delete',categoryController.destroy)
app.delete('/deleteRecord',categoryController.deleteAllData)
}
