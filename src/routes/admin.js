const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');
// productListController.productList
router.use('/products', adminController.getProducts);
router.use('/updateOrders/get', adminController.getOrders);
router.use('/updateOrders/post', adminController.updateOrders);
router.use('/updateProduct', adminController.postProduct);
router.use('/forgotPassword', adminController.forgot);
router.use('/login', adminController.login);
router.use('/', adminController.login);

module.exports = router;