const express = require('express');
const router = express.Router();

const productDetailsController = require('../app/controllers/ProductDetailsController');
// productListController.productList
router.use('/get', productDetailsController.productDetails);
router.use('/', productDetailsController.productDetails);

module.exports = router;