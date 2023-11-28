import express from 'express'
import productCtrl from '../controllers/product.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router();

router.route('/api/products')
    .post(authCtrl.requireSignin, productCtrl.create)
    .get(productCtrl.read);

router.route('/api/products/:productId')
    .put(authCtrl.requireSignin, productCtrl.update)
    .delete(authCtrl.requireSignin, productCtrl.remove);

router.param('productId', productCtrl.productByID);

export default router