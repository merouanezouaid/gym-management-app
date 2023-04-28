const mongoose = require("mongoose");

const Role = mongoose.model(
  "role",
  new mongoose.Schema({
    name: String
  })
);
module.exports = Role;