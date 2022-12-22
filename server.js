const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const router = require("./app/routes");
// require('./app/routes/category')(app);
require("./app/routes/auth.routes", router.authRote)(app);
require("./app/routes/user.routes", router.userRote)(app);
require("./app/routes/category.routes", router.categoryRote)(app);
require('./app/routes/advertisement.routes',router.advertisementRote)(app);
// require("/uploads", express.static(path.join(__dirname, "uploads")))(app);
app.options('*', cors(corsOpts))

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});


// Upload File Receive Local
app.use(express.static(path.resolve('./uploads')));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const Role = db.role;


// Setup on browser in MongoDB linked

// const dbConfig = require("./app/config/db.config.js");
// db.mongoose
// .connect(
//   "mongodb+srv://manjit:1234@nodeapi.cierv21.mongodb.net/?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }
// )
// .then(() => {
//   console.log("Successfully connect to MongoDB.");
//  initial();
// })
// .catch(err => {
//    console.error("Connection error", err);
// process.exit();
// });



// Setup MongoDB Locally

const dbConfig = require("./app/config/db.config.js");
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

const initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      // new Role({
      //   name: "moderator"
      // }).save(err => {
      //   if (err) {
      //     console.log("error", err);
      //   }

      //   console.log("added 'moderator' to roles collection");
      // });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
};
