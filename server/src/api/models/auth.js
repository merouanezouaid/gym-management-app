const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./users");
db.role = require("./roles");
db.ROLES = ["admin", "moderator"];
module.exports = db;