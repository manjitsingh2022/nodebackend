const  verifySignUp  = require("../middleware/verifySignUp");
// const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.delete("/deleteAll", controller.deleteAll);
  app.delete("/delete", controller.deleteOne);
  app.get('/userlist', controller.userList)
  // app.patch("/api/auth/update", controller.updateUser);
  app.patch("/api/auth/update/:id", controller.updateUser);
  // app.delete("/api/auth/signin/delete/_id", controller.singledelete);
};