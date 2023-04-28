const express = require("express");

const paymentController = require("./../controllers/payment.controller");

const router = express.Router();

router
  .route("/")
  .post(paymentController.addPayment)
  .get(paymentController.getPayments);

module.exports = router;
