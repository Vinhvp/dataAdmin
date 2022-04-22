const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');
// productListController.productList

router.use('/isValid', accountController.Accounts);
router.use('/', accountController.updateAccounts);

module.exports = router;