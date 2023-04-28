const express = require("express");

const notificationsController = require("./../controllers/notifications.controller");

const router = express.Router();

router
  .route("/")
  .post(notificationsController.addNotification)
  .get(notificationsController.getNotifications);

module.exports = router;
