const express = require('express');
const userCtrl = require('../controllers/user.controller');
const router = express.Router()
router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create)
router.route('/api/users/:userId')
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove)
router.param('userId', userCtrl.userByID)
router.route('/api/users').post(userCtrl.create)
router.route('/api/users').get(userCtrl.list)
router.param('userId', userCtrl.userByID)
router.route('/api/users/:userId').get(userCtrl.read)
router.route('/api/users/:userId').put(userCtrl.update)
router.route('/api/users/:userId').delete(userCtrl.remove)

module.exports = router;
