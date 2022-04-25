const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');
// productListController.productList
router.use('/verify/', accountController.updateVerify);
router.use('/login/', accountController.login);
router.use('/', accountController.updateAccounts);

module.exports = router;