const express = require("express");
const path = require("path");

const dashboardController = require("./../controllers/dashboard.controller");

const router = express.Router();

router.route("/").get(dashboardController.getData);

module.exports = router;
