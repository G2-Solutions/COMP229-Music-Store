import express from 'express';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/auth/signin')
  .post(authCtrl.signin);

router.route('/auth/signout')
  .get(authCtrl.requireSignin, authCtrl.signout);

export default router;
