const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.navbar = require("./navbar.model");
db.category = require("./category.model");
db.advertisement = require("./advertisement.model");
db.store = require("./store.model");
db.ROLES = ["user", "admin", /* "moderator" */];

module.exports = db;