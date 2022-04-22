const express = require('express');
const router = express.Router();

const productListController = require('../app/controllers/ProductListController');
// productListController.productList
router.use('/get', productListController.productList);
router.use('/', productListController.productList);


module.exports = router;