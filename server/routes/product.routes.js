const express = require('express');
const productCtrl = require('../controllers/product.controller');
const authCtrl = require('../controllers/auth.controller');
const router = express.Router();

router.route('/api/products')
    .post(authCtrl.requireSignin, productCtrl.create)
    .get(productCtrl.read);

router.route('/api/products/:productId')
    .put(authCtrl.requireSignin, productCtrl.update)
    .delete(authCtrl.requireSignin, productCtrl.remove);

router.param('productId', productCtrl.productByID);

module.exports = router;