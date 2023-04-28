const express = require('express')
const path = require("path");

const productController = require('./../controllers/products.controller');

const router = express.Router();

router.route('/')
.get(productController.getAllProducts)
.post( productController.addProduct)

module.exports = router;